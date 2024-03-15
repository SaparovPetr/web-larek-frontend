# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```


# Компоненты:

Проект выполнен путем использования паттерна MVP и  имеет три слоя: 

## СлойPresenter
Слой **Presenter** (представлен файлом index.ts), назначение которого отвечать за управление событиями, эмитируемыми классом EventEmitter (файл events.ts), используя данные двух других слоев.
## Слой Model
  Слой **Model** (будет представлен файлами **Model.ts**, **AppData.ts**). Назначение слоя - получение и работа с данными пользователя и данными, полученными от сервера.
 
 ### Файл Model.ts - базовый класс
 #### 🎸class Model (базовый класс)
 Класс  **Model** - публикует событие об изменении модели, чтобы все подписчики обновились.

 ### Файл AppData.ts
 #### 🎸 class AppState 
 Расширяет класс **Model**, имеет интерфейс IAppState (описывает состояние приложения).
 
 Имеет поля:
 `catalog: IItemData[] `- массив объектов товара,
  `order: IOrder = {}` - объект, формируемый для отправки на сервер сведений о заказе,
  `preview: string | null` - хранит ID карточки, подлежащей отображению в превью.

Имеет методы:
  `setCatalog(items: IItemData[])` - создает экземпляры полученных  с сервера карточек,
  `setPreview(item: IItemData)` - устанавливает данные конкретной карточки в слой Вью по ее идентификатору.
  `setOnlinePayWay()` - устанавливает значение предпочитаемого пользователем способа оплаты.
  `setOfflinePayWay()` - устанавливает значение предпочитаемого пользователем способа оплаты.

 
 #### 🎸 class BasketData 
  Расширяет класс **Model**, имеет интерфейс `IBasketData` (описывает данные корзины и  ее методы).

Имеет поле:
  `basketArray: IItemData[]` - массив карточек, добавленных в корзину,
   
   Имеет методы:
   `addToBusket(item: IItemData)` - добавления в массив корзины,
  `removeFromBusket(item: IItemData)` - удаления из массива корзины,
  `clearBasket(): void` - очистки массива корзины,
  `makeSum(): number` - подсчета итоговой стоимости корзины.

   
   ### Файл api.ts
   #### 🎸 abstract class Api
  Базовый класс для работы с сетью. 

### Файл LarekApi.ts
 #### 🎸 class LarekApi 
Расширяет (наследует) класс `Api`. Работает с данными, предоставляемыми сервером.
Имеет свойство: 
  `readonly cdn: string` - URL CDN-сервиса, который будет использоваться для получения URL-адресов.
  
 Имеет методы:
 `getOneItem(id: string): Promise <IItemData>`  - получения одной карточки,
 `getItemList(): Promise<IItemData[]>` - получения списка карточек,
 `orderItems(order: IOrder): Promise <IOrderResult>` - отправки сведений о заказе методом POST.


## Слой View
Назначение **View** состоит в отображении и обработке полученных данных.
### Файл Component.ts

   #### 🎸 abstract class Component<Т>
Базовый компонент. Имеет инструментарий для работы с DOM в дочерних компонентах, а именно методы:
`toggleClass() `- переключения класса (принимает элемент и его новый класс)
`setText()` - установки текста (принимает элемент и устанавливаемый текст)
`setDisabled()` - установки атрибута Disabled (принимает сам элемент и булевое состояние) 
`setHidden()` - скрытия элемента (принимает элемент)
`setVisible() `- показа элемента (принимает элемент)
`setImage() `- установки ссылки на картинку (принимает элемент, ссылку и альт-текст)
`render()` - возвращает корневой DOM-элемент (принимает данные любого типа - опционально)

### Файл Modal.ts
  #### 🎸 class Modal
Класс модального окна.
Имеет защищенные поля:
`closeButton: HTMLButtonElement `- кнопка закрытия,
`сontent: HTMLElement` - содержимое окна.

Имеет методы:
`open()`  - открытия,
`close()`  - закрытия,
`render(data: IModalData): HTMLElement` - принимает контент и возвращает контейнер с ним.

### Файл CatalogPage.ts
 #### 🎸 class CatalogPage 
 Класс отображения главной страницы.
 Наследует класс `Component<IcatalogPage>`.
 
 Имеет поля:
 `counter: HTMLElement`  - счетчик корзины,
  `catalog: HTMLElement `- контейнер каталога,
 `wrapper: HTMLElement` - контейнер страницы,
 `basket: HTMLElement` - кнопка корзины.

Имеет сеттеры полей:
  `set counter(value: number)` - устанавливает значение счетчика на иконке корзины,
  `set catalog(items: HTMLElement[])` - используется для замены всех дочерних элементов указанного родительского элемента новыми элементами.
  `set locked(value: boolean)` - используется для установки статуса блокировки скролла.

### Файл Card.ts
  #### 🎸 class Card 
  Базовый класс для всех типов карточек.
 Наследует класс `Component<IItemData>`.

Имеет свойства:
`category: HTMLElement` - установки категории товара,
`title: HTMLElement `- установки названия,
`image: HTMLImageElement` - установки изображения,
`price: HTMLElement `- установки цены,
`id: string `- установки идентификатора.
 
 
   #### 🎸 class CatalogItem
  Класс карточки каталога, унаследованный от  `Card`.
  Принимает в конструктор имя блока, контейнер с карточкой и ссылку на коллбек действий с карточкой. На его основе создается экземпляр каждой карточки каталога. 
  


   #### 🎸 class PreviewItem
Класс карточки для отображения превью в модальном окне унаследованный от  Card.
Поля:
`description: HTMLElement `- описание товара,
`  buyButton: HTMLButtonElement `- кнопка покупки.

   #### 🎸 class ShortItem
  Класс карточки корзины. Расширяет класс `Component<IItemData>`.
  Поля:
 ` itemIndex: HTMLElement` - номер позиции в корзине,
 ` title: HTMLElement` - заголовок,
  `price: HTMLElement` - цена, 
  `basketDeleteButton: HTMLButtonElement` - кнопка удаления из корзины, слушающая клик по ней.  

### Файл Basket.ts
  #### 🎸 class  Basket
 Класс, определяющий свойства темплейта всей корзины, наследует `Component<IBasket>`.
 Имеет поля:
 `ul: HTMLElement` - используется для замены всех дочерних элементов указанного родительского элемента новыми элементами.
  `orderButton: HTMLButtonElement` - кнопка заказа.
  `basketCounter: HTMLElement` - счетчик стоимости содержимого корзины.
  


### Файл FirstOrderPage.ts
 

  #### 🎸 class FirstOrderPage
 Расширяет `Component<IFirstOrderPage>` .
  Имеет поля защищенные поля:
`payCard: HTMLButtonElement `- кнопка выбора платежа онлайн.
  `payCash: HTMLButtonElement` - кнопка выбора платежа оффлайн.
  `addressInput: HTMLInputElement` - поле ввода адреса.
  `nextScreenButton: HTMLButtonElement` - кнопка перехода к следующей странице оформления заказа.
  `firstOrderPageError: HTMLElement` - элемент ошибки, появляющийся при невалидности инпута адреса.
### Файл SecondOrderPage.ts
  #### 🎸 class  SecondOrderPage 
 Расширяет класс `Component<ISecondOrderPage>`
   Имеет  защищенные поля:
  `emailInput: HTMLInputElement` - инпут ввода почты,
 `phoneInput: HTMLInputElement` - инпут ввода телефона,
 `finishScreenButton: HTMLButtonElement` - кнопка оплаты,
 `secondOrderPageError: HTMLElement` - элемент ошибки, появляющийся при невалидности инпута.
  
### Файл SuccessPage.ts
  #### 🎸 class  SuccessPage
 Расширяет класс `Component<ISuccessPage>`
   Имеет  защищенные поля:
  `counter: HTMLElement` - устанавливает значение счетчика,
  `lastButton: HTMLButtonElement` - кнопка "Сделать новый заказ".

# Интерфейсы

```ts
////////   ИНТЕРФЕЙСЫ ДЛЯ МОДЕЛИ

// интерфейс заказа 
export interface IOrder {
  payment: "online" | "offline";
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}
// интерфейс состояния всего приложения 
export interface IAppState {
  catalog: IItemData[];
  order: IOrder | null;
  preview: string | null;
}

// интерфейс состояния корзины 
export interface IBasketData {
  basketArray: IItemData[];
}
// интерфейс ответа сервера на сделанный заказ
export interface IOrderResult {
  id: string;
  total: number;
}

// интерфейс данных товара
export interface IItemData {
  id?: string;
  description?: string;
  image?: string;
  title: string;
  category?: string;
  price: number | null;
  itemIndex?: number;
}


////////   ИНТЕРФЕЙС ДЛЯ КАТАЛОГА

export interface IcatalogPage {
  counter: number;
  catalog: HTMLElement[];
  wrapper: HTMLElement;
  basket: HTMLElement;
  locked: boolean;
}


////////   ИНТЕРФЕЙС ПРЕВЬЮ

// общий интерфейс действий для всех типов карточек
export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

// интерфейс карточки превью 
export interface IPreviewItem {
  description: HTMLElement;
  buyButton: HTMLButtonElement;
}


////////    ИНТЕРФЕЙСЫ ДЛЯ КОРЗИНЫ 

// интерфейс действий в корзине
export interface IBasketActions {
  onClick: (event: MouseEvent) => void;
}
// интерфейс корзины
export interface IBasket {
  ul: HTMLElement[];
  counter: number;
}


////////   ИНТЕРФЕЙС ДЛЯ МОДАЛЬНОГО  ОКНА

export interface IModalData {
  content: HTMLElement;
}

////////   ИНТЕРФЕЙСЫ ДЛЯ ПЕРВОЙ СТРАНИЦЫ ОФОРМЛЕНИЯ

// интерфейс действий на первой странице оформления
export interface IFirstOrderPageActions {  
  onOnlineClick(event: MouseEvent): void;
  onOfflineClick(event: MouseEvent): void;
  inputRun(event: Event): void;
  onClick(event: MouseEvent): void;
}
// интерфейс первой страницы оформления
export interface IFirstOrderPage {  
  payCard: HTMLButtonElement;
  payCash: HTMLButtonElement;
  addressInput: HTMLInputElement;
  nextScreenButton: HTMLButtonElement;
  firstOrderPageError: HTMLElement;
}

////////   ИНТЕРФЕЙСЫ ДЛЯ ВТОРОЙ СТРАНИЦЫ ОФОРМЛЕНИЯ

// интерфейс действий на второй странице оформления
export interface ISecondOrderPageActions {  
  emailInputinputRun(event: Event): void;
  phoneInputRun(event: Event): void;
  onClick(event: MouseEvent): void;
}
// интерфейс второй страницы оформления
export interface ISecondOrderPage {  
  emailInput: HTMLInputElement;
  phoneInput: HTMLInputElement;
  finishScreenButton: HTMLButtonElement;
  secondOrderPageError: HTMLElement;
}


////////   ИНТЕРФЕЙС ДЛЯ СТРАНИЦЫ УСПЕХА

export interface ISuccessPage {
  counter: number;
  onClick: (event: MouseEvent) => void;
}


```
