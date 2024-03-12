import './scss/styles.scss';
import { EventEmitter}  from '../src/components/base/events';
import { LarekApi } from './components/LarekApi';
import {API_URL, CDN_URL} from "./utils/constants";
import {AppState, CatalogChangeEvent, ItemData, BasketData} from "./components/AppData";
import {CatalogPage} from "./components/CatalogPage";
import {cloneTemplate, ensureElement} from "./utils/utils";
import {CatalogItem, PreviewItem, ShortItem} from "./components/Card";
import {FirstOrderPage} from "./components/FirstOrderPage";
import {SecondOrderPage} from "./components/SecondOrderPage";
import {SuccessPage} from "./components/SuccessPage";


import {Modal} from "./components/Modal";
// import {Basket, BasketList} from "./components/Basket"
import {Basket} from "./components/Basket"

const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const basketListTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const firstOrderScreenTemplate = ensureElement<HTMLTemplateElement>('#order');
const secondOrderScreenTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const basket = new Basket(cloneTemplate(basketTemplate), {
  onClick: () => events.emit('orderButton:click')
});

// Модель данных приложения
const appData = new AppState({}, events);
const basketList = new BasketData([], events)


// Глобальные контейнеры
const page = new CatalogPage(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Изменились элементы каталога
// 1^. В функции, которая рендерит карточки каталога, к каждой карточке прикрепляется обработчик события onClick:
// 2^. Когда пользователь кликает на карточку, вызывается функция onClick, которая генерирует событие card:select с помощью объекта events (EventEmitter):
events.on<CatalogChangeEvent>('items:changed', () => {
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

//  3^. есть подписчик на это событие card:select:
//  4^. Когда событие card:select сгенерировано, вызывается этот подписчик, 
//      который устанавливает выбранный лот в appData как "предпросмотр" (appData.setPreview(item)).
// Открыть лот
events.on('card:select', (item: ItemData) => {
  appData.setPreview(item);
  console.log(`клик по карточке каталога ${item.id}`);  
});


// Изменен открытый выбранный лот
events.on('preview:changed', (item: ItemData) => {
  const showItem = (item: ItemData) => {
      const previewCard = new PreviewItem(cloneTemplate(cardPreviewTemplate), {
        onClick: () => events.emit('busketButton:click', item)
    });     

      // 5^. Далее срабатывает другой подписчик на событие preview:changed:
      // 6^. Этот подписчик рендерит модальное окно (modal.render()), передавая в него содержимое, сгенерированное компонентом PreviewItem (card.render()).
    modal.render({
      content: previewCard.render({
        title: item.title,
        image: item.image,
        description: item.description,             
        price: item.price,
        category: item.category,
      })
    });

    if (item.title === 'Мамка-таймер') {
      console.log('открыта бесценная карточка');
      previewCard.basketButton.setAttribute("disabled", "disabled");
      previewCard.basketButton.textContent = "Недоступно для приобретения";
    }
  
    if (appData.order.items.includes(item.id)) {
      console.log('Уже в корзине');
      previewCard.basketButton.setAttribute("disabled", "disabled");
      previewCard.basketButton.textContent = "Уже в корзине";

  
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
events.on('busketButton:click', (item: ItemData) => {  
  if (!basketList.basketArray.includes(item)) {
    basketList.addToBusket(item);
    appData.order.items.push(item.id);    
    appData.order.total = basketList.makeSum();
  } else {
    console.log('уже в корзине')
  } 
  console.log(`клик "в корзину" ${item.id}`);
  basket.orderButton.removeAttribute("disabled");
  modal.close();
});


// изменен массив корзины
events.on('basket:changed', (item: ItemData) => {    
  page.counter = basketList.basketArray.length;
  basket.counter = basketList.makeSum();
  basket.ul = basketList.basketArray.map(item => {
    const cardForBasket = new ShortItem(cloneTemplate(basketListTemplate), {
      onClick: () => events.emit('basketDeleteButton:click', item)
  });
    // console.log(basket.ul)
    return cardForBasket.render({
        title: item.title,
        price: item.price,
        itemIndex: basketList.basketArray.indexOf(item) + 1,
    });
  });     
})


//  клик по кнопке корзины на главной - верхний темплейт
events.on('basket:open', (item: ItemData) => {  
  modal.render({
    content: basket.render()
  })  
})

// клик по кнопке удаления в корзине
events.on('basketDeleteButton:click', (item: ItemData) => {  
  console.log(`клик "удалить из списка корзины" ${item.id}`);
  basketList.removeFromBusket(item);
  appData.order.items.shift();


  // деактивировать кнопку "оформить" в очищенной корзине
  if (!basketList.basketArray.length) {
    basket.orderButton.setAttribute("disabled", "disabled");
  }
})


// клик "Оформить"
events.on('orderButton:click', () => {  
  console.log(`клик "Оформить" `);
  const firstOrderScreen = new FirstOrderPage(cloneTemplate(firstOrderScreenTemplate), {
    onClick: () => events.emit('firstOrderScreenButton:click'),
    onOnlineClick: () => events.emit('by-card:click'),
    onOfflineClick: () => events.emit('by-cash:click'),
    inputRun: () => events.emit('input:tap'),
  });

  events.on('by-card:click', () => { 
    console.log(`клик "Онлайн" `);
    firstOrderScreen.payCard.classList.add('button_alt-active');
    firstOrderScreen.payCash.classList.remove('button_alt-active');
    appData.setOnlinePayWay()
    console.log(appData.order)
  })
  
  events.on('by-cash:click', () => { 
    console.log(`клик "Офлайн" `);
    firstOrderScreen.payCash.classList.add('button_alt-active');
    firstOrderScreen.payCard.classList.remove('button_alt-active');
    appData.setOfflinePayWay()
    console.log(appData.order)
  })
  
  events.on('input:tap', () => { 
    console.log(`ввод`);
    appData.order.address = firstOrderScreen.addressInput.value;
    console.log(appData.order)
    if (appData.order.address.length) {
      firstOrderScreen.nextScreenButton.removeAttribute("disabled")
      firstOrderScreen.firstOrderPageError.textContent = '';

    } else {
      firstOrderScreen.nextScreenButton.setAttribute("disabled", "disabled");
      firstOrderScreen.firstOrderPageError.textContent = 'Необходимо указать адрес';

    }
  })  

  modal.render({
    content: firstOrderScreen.render()
  })
})


// Клик Далее
events.on('firstOrderScreenButton:click', () => { 
  console.log(`клик Далее `);
  const secondOrderScreen = new SecondOrderPage(cloneTemplate(secondOrderScreenTemplate), {
    onClick: () => events.emit('secondOrderScreenButton:click'),
    emailInputinputRun: () => events.emit('emailInput:tap'),
    phoneInputRun: () => events.emit('phoneInput:tap'),
  });

  events.on('emailInput:tap', () => { 
    appData.order.email = secondOrderScreen.emailInput.value;
    console.log(appData.order);
    
    if (!appData.order.email.length) {
      secondOrderScreen.finishScreenButton.setAttribute("disabled", "disabled");
      secondOrderScreen.secondOrderPageError.textContent = 'Необходимо указать email';
    } else {
      secondOrderScreen.secondOrderPageError.textContent = '';
    }

    
  })  

  events.on('phoneInput:tap', () => { 
    appData.order.phone = secondOrderScreen.phoneInput.value;
    console.log(appData.order);

    if (appData.order.email.length && appData.order.phone.length) {
      secondOrderScreen.finishScreenButton.removeAttribute("disabled");
      secondOrderScreen.secondOrderPageError.textContent = '';
    } else {
      secondOrderScreen.finishScreenButton.setAttribute("disabled", "disabled");
      secondOrderScreen.secondOrderPageError.textContent = 'Необходимо указать телефон';
    }

  })

  modal.render({
    content: secondOrderScreen.render()
  });

  
})  


// Клик Оплатить
events.on('secondOrderScreenButton:click', () => { 
  console.log(`клик Оплатить`);
  api.orderItems(appData.order)
    .then((result) => {        
      const successScreen = new SuccessPage(cloneTemplate(successTemplate), {
        onClick: () => events.emit('successScreenButton:click'),
        counter: basketList.makeSum()
      });

      modal.render({
        content: successScreen.render({
          counter: basketList.makeSum()          
        })            
      });

      basketList.clearBasket();
      appData.order.items = [];
      basket.orderButton.setAttribute("disabled", "disabled");

      
    })
    .catch(err => {
      console.error(err);
    });  
 
})

// Клик  За новыми покупками
events.on('successScreenButton:click', () => {
  console.log(`клик За новыми покупками`);
  modal.close();
  basket.orderButton.setAttribute("disabled", "disabled");
}) 


   
















// деактивировать кнопку "оформить" в изначально пустрой корзине
if (!basketList.basketArray.length) {
  basket.orderButton.setAttribute("disabled", "disabled");
}

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
  page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
  page.locked = false;
});

// получить карточки с сервера
api.getItemList()
  .then(appData.setCatalog.bind(appData))
  .catch(err => {
      console.error(err);
  });

