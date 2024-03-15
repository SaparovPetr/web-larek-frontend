import './scss/styles.scss';
import {IItemData, IOrderForm, IDeliveryForm} from "./types/index";
import { EventEmitter}  from './components/base/Events';

import { LarekApi } from './components/LarekApi';
import {API_URL, CDN_URL} from "./utils/constants";
import {AppState, BasketData} from "./components/AppData";
import {CatalogPage} from "./components/CatalogPage";
import {cloneTemplate, ensureElement} from "./utils/utils";
import {CatalogItem, PreviewItem, ShortItem} from "./components/Card";
import {DeliveryForm} from './components/DeliveryForm';
import {SuccessPage} from "./components/SuccessPage";
import {Modal} from "./components/common/Modal";
import {Basket} from "./components/Basket";
import {ContactsForm} from './components/ContactsForm';

const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const basketListTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const DeliveryFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const ContactsFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');


// Модель данных приложения
const appData = new AppState({}, events);
const basketList = new BasketData([], events)

// Глобальные контейнеры
const page = new CatalogPage(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const deliveryForm = new DeliveryForm(cloneTemplate(DeliveryFormTemplate), events)
const contactsForm = new ContactsForm(cloneTemplate(ContactsFormTemplate), events)
const basket = new Basket(cloneTemplate(basketTemplate), events);

// Изменились элементы каталога
events.on('items:changed', () => {
  page.catalog = appData.catalog.map(item => {
      const card = new CatalogItem(cloneTemplate(cardCatalogTemplate), {
          onClick: () => events.emit('card:select', item)
      });
      return card.render({
          title: item.title,
          image: item.image,
          price: item.price,
          category: item.category,
      });
  });  
});

/// Открыть карточку превью
events.on('card:select', (item: IItemData) => {
  appData.setPreview(item);
  console.log(`отладка - клик по карточке каталога ${item.id}`);  
});

// Изменена карточка
events.on('preview:changed', (item: IItemData) => {
  const showItem = (item: IItemData) => {
      const previewCard = new PreviewItem(cloneTemplate(cardPreviewTemplate), {
        onClick: () => events.emit('busketButton:click', item)
    }); 
    modal.render({
      content: previewCard.render({
        title: item.title,
        image: item.image,
        description: item.description,             
        price: item.price,
        category: item.category,
      })
    });

    // деактивация кнопики "В корзину", если товар бесценен
    if (item.price === null) {
      console.log('отладка - открыта бесценная карточка');
      previewCard.markPriceless();     
    }

    // деактивация кнопики "В корзину", если товар прежде добавлен в нее
    if (appData.order.items.includes(item.id)) {      
      console.log('отладка - Уже в корзине');
      previewCard.markAdded()
    }
  }; 

  if (item) {
      api.getOneItem(item.id)
        .then((result) => {
          item.description = result.description;
          showItem(item);
        })
        .catch((err) => {
          console.error(err);
        })
  } else {
    modal.close();
  }
});

//  клик по кнопке "в корзину" - отправляет данные карточки для их добавления в массив
events.on('busketButton:click', (item: IItemData) => {  
  if (!basketList.basketArray.includes(item)) {
    basketList.addToBusket(item);
    appData.order.items.push(item.id);    
    appData.order.total = basketList.makeSum();
  }  
  console.log(`отладка - клик "в корзину" ${item.id}`);
  basket.makeButtonAbled(false);
  modal.close();
});

// изменен массив корзины
events.on('basket:changed', () => {    
  page.counter = basketList.basketArray.length;
  basket.counter = basketList.makeSum();
  basket.ul = basketList.basketArray.map(item => {
    const cardForBasket = new ShortItem(cloneTemplate(basketListTemplate), {
      onClick: () => events.emit('basketDeleteButton:click', item)
  });
    return cardForBasket.render({
        title: item.title,
        price: item.price,
        itemIndex: basketList.basketArray.indexOf(item) + 1,
    });
  });     
})

//  клик по кнопке корзины на главной - внешний темплейт
events.on('basket:open', () => {  
  modal.render({
    content: basket.render()
  })  
})

// клик по кнопке удаления в корзине
events.on('basketDeleteButton:click', (item: IItemData) => {  
  console.log(`отладка - клик "удалить из списка корзины" ${item.id}`);
  basketList.removeFromBusket(item);
  appData.order.items.pop();
  appData.order.total = basketList.makeSum();
  console.log(appData.order);


  // деактивировать кнопку "оформить" в очищенной корзине
  if (!basketList.basketArray.length) {
    basket.makeButtonAbled(true);
  }
})

// клик "Оформить"
events.on('order:open', () => {
    modal.render({
      content: deliveryForm.render({
        payment: '',
        address: '',
        valid: false,
        errors: []
      })
  });

  // Изменилось одно из полей первой формы
  events.on(/^order\..*:change/, (data: { field: keyof IOrderForm, value: string }) => {
    appData.setOrderField(data.field, data.value);  
    console.log(appData.order);
  });

  // Изменилось состояние валидации первой формы
  events.on('formErrors:change', (errors: Partial<IDeliveryForm>) => {
    const { address, payment } = errors;
    deliveryForm.valid = !address && !payment;
    deliveryForm.errors = Object.values({address}).filter(i => !!i).join('; ');
  });

  // Изменился способ оплаты - на карту
  events.on('by-card:click', () => {
    console.log(`отладка - клик "Онлайн" `);
    appData.setOnlinePayWay();
    deliveryForm.makePayByCardActive(true);
    deliveryForm.makePayByCashActive(false); 
  })

  // Изменился способ оплаты - на наличные
  events.on('by-cash:click', () => {
    console.log(`отладка - клик "Офлайн" `);
    appData.setOfflinePayWay();
    deliveryForm.makePayByCashActive(true); 
    deliveryForm.makePayByCardActive(false);
  })
});

// клик "Далее"
events.on('order:submit', () => {
  modal.render({
    content: contactsForm.render({
      email: '',
      phone: '',
      valid: false,
      errors: []
    })
  });

  // Изменилось состояние валидации второй формы
  events.on('formErrors:change', (errors: Partial<IOrderForm>) => {
    const { email, phone } = errors;
    contactsForm.valid = !email && !phone;
    contactsForm.errors = Object.values({ email, phone }).filter(i => !!i).join('; ');
  });

  // Изменилось одно из полей второй формы
  events.on(/^contacts\..*:change/, (data: { field: keyof IOrderForm, value: string }) => {
    appData.setOrderField(data.field, data.value);  
    console.log(appData.order);
  });
});

events.on('contacts:submit', () => {
  console.log('отладка - клик Оплатить');
  api.orderItems(appData.order)
    .then((result) => {        
      const successScreen = new SuccessPage(cloneTemplate(successTemplate), {
        onClick: () => events.emit('successScreenButton:click')
      });      
      modal.render({
        content: successScreen.render({
          counter: basketList.makeSum()          
        })            
      });
    })
    .catch(err => {
      console.error(err);
    });   
});

// Клик  "За новыми покупками"
events.on('successScreenButton:click', () => {
  console.log(`отладка - клик "За новыми покупками"`);
  basketList.clearBasket();
  appData.order.items = [];
  modal.close();
  basket.makeButtonAbled(true);
});

// деактивировать кнопку "оформить" в изначально пустрой корзине
if (!basketList.basketArray.length) {
  basket.makeButtonAbled(true);
}

// Блокироватьпрокрутку страницы если открыта модалка
events.on('modal:open', () => {
  page.locked = true;
});

// Разблокировать прокрутку страницы если  модалка закрыта
events.on('modal:close', () => {
  page.locked = false;
});

// получить карточки с сервера
api.getItemList()
  .then(appData.setCatalog.bind(appData))
  .catch(console.error);