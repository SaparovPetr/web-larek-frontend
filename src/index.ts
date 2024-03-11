import './scss/styles.scss';
import { EventEmitter}  from '../src/components/base/events';
import { LarekApi } from './components/LarekApi';
import {API_URL, CDN_URL} from "./utils/constants";
import {AppState, CatalogChangeEvent, ItemData, BasketData} from "./components/AppData";
import {CatalogPage} from "./components/CatalogPage";
import {cloneTemplate, ensureElement} from "./utils/utils";
import {CatalogItem, AuctionItem, BidItem} from "./components/Card";
import {FirstOrderPage} from "./components/FirstOrderPage";
import {SecondOrderPage} from "./components/SecondOrderPage"

import {Modal} from "./components/Modal";
// import {Basket, BasketList} from "./components/Basket"
import {Basket} from "./components/Basket"





const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);


// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
  console.log(eventName, data);
})


// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const basketListTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const firstOrderScreenTemplate = ensureElement<HTMLTemplateElement>('#order');
const secondOrderScreenTemplate = ensureElement<HTMLTemplateElement>('#contacts');

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
  // appData.order.items.push(item);
  console.log(`клик по карточке каталога ${item.id}`) 
});


// Изменен открытый выбранный лот
events.on('preview:changed', (item: ItemData) => {
  const showItem = (item: ItemData) => {
      const previewCard = new AuctionItem(cloneTemplate(cardPreviewTemplate), {
        onClick: () => events.emit('busketButton:click', item)
    });     

      // 5^. Далее срабатывает другой подписчик на событие preview:changed:
      // 6^. Этот подписчик рендерит модальное окно (modal.render()), передавая в него содержимое, сгенерированное компонентом AuctionItem (card.render()).
    modal.render({
      content: previewCard.render({
        title: item.title,
        image: item.image,
        description: item.description,             
        price: item.price,
        category: item.category,
      })
    });
  };

  if (item) {
      api.getLotItem(item.id)
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
    const cardForBasket = new BidItem(cloneTemplate(basketListTemplate), {
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
events.on('bids:open', (item: ItemData) => {  
  modal.render({
    content: basket.render()
  })  
})

// клик по кнопке удаления в корзине
events.on('basketDeleteButton:click', (item: ItemData) => {  
  console.log(`клик "удалить из списка корзины" ${item.id}`);
  basketList.removeFromBusket(item);
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
    console.log(`ввод `);
    appData.order.address = firstOrderScreen.addressInput.value;
    console.log(appData.order)
    if (appData.order.address.length) {
      firstOrderScreen.nextScreenButton.removeAttribute("disabled")
    } else {
      firstOrderScreen.nextScreenButton.setAttribute("disabled", "disabled");
    }
  })  

  modal.render({
    content: firstOrderScreen.render()
  });

  events.on('firstOrderScreenButton:click', (item: ItemData) => { 
    console.log(`клик Далее `);  
  })  
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

