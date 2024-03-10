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
- src/styles/styles.scss — корневой файл стилей
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


## Компоненты

Проект  будет выполнен паттерном MVP и будет иметь  три слоя: 

### Presenter
 **Presenter** (будет представлен файлом index.ts), назначение которого отвечать за управление событиями используя данные двух других слоев.
### Model
 **Model** (будет представлен файлом AppData.ts с классами **orderData**, **busketData**  и **itemData**). Назначение слоя - получение и работа с данными пользователя и данными, полученными от сервера (классы **orderData**, **busketData**  и **itemData** соответственно).

**itemData** - класс, описывающий получаемый с сервера объект товара, имеет поля
id - id товара, 
description - описание товара, 
image - ссылку на логотип товара, 
title - заголовок товара,
category - категорию,
price - цену товара. 
Не имеет методов.

**busketData** - класс, описывающий содержимое корзины, имеет поле:
`listWithItems` - массив карточек, добавленных в корзину.
Имеет методы:
`getList() `- получения массива для его рендеринга,
`removeItem()` - удаления элемента массива, возвращает обновленный массив,
`calculateTotalPrice()` - подсчета итоговой стоимости всех карточек массива.

**orderData** - класс, описывающий данные, предоставленные пользователем для отправки заказа на сервер. 
Имеет поля:
`payment` - вид платежа,
`email` - почта,
`phone` - номер телефона,
`address` - адрес,
`total` - общая сумма заказа,
`items` - массив, заказанных товаров.

Имеет метод `pushAllPaymentDataToServer()`, предназначенный для отправки данных на сервер.

### View
Слой **View** будет представлен файлами с классами **Component.ts**,  **CatalogPage.ts**, **Card.ts**, **Modal.ts**, **ItemModal.ts**, **BusketModal.ts**,  **WayToPayModal.ts**, **SetContactsModal.ts**,  **SuccessModal.ts**. 
Назначение **View** состоит в отображении и обработке полученных данных.

**Component** - абстрактный класс, представляющий из себя базовый компонент для размещения данных в разметке.

Его наследуют **CatalogPage**,  **Card** и **Modal**.

**CatalogPage** - страница с каталогом товаров, имеющая поля 
`wrapper` - обертка всей страницы;
`counter` - счетчик товаров в корзине ;
`catalog` - блок с товарами;
`basket` -  кнопка корзины;

**Card** - класс для переиспользуемой карточки, имеет поля, устанавливающие:
`image` -  картинку, 
`category` -  категорию, 
`title` - заголовок,
`price` - цену товара.

**Modal** - класс, описывающий поля и методы модального окна:
`modalCloseButton` - кнопка закрытия, 
`modalContent` - содержимое, 
`nextStepButton` - кнопка перехода на следующий этап сценария.
Методы:
`openModal()` - открытия окна,
`closeModal()` - закрытия окна,
`goToTheNextStep()` - перехода к следующему экрану пользовательского пути при нажатии на кнопку `nextStepButton`,
`render()` - отрисовки контента окна.


Класс **Modal**  наследуют компоненты:
**ItemModal** - экран с карточкой товара, для ее добавления в корзину.
Поля:
`image` - эмблема карточки,
`category` - категория товара, 
`title` - заголовок товара,
`description` - описание товара,
`price` - цена товара, 
Методы:
`addItemToBusket()` - добавления карточки в массив корзины.

**BusketModal** - экран корзины.
Поля: 
`listWithItems` - массив карточек,
Методы:
`getList()` - получение массива карточек ,
`removeItem()` - удаление карточки из массива, возвращает обновленных массив,
`calculateTotalPrice()` - подсчитывает сумму стоимости всех карточек в массиве.

**WayToPayModal** - экран ввода способа оплаты и адреса пользователя.
Поля:
`payment` - вид платежа,
`address` - адрес покупателя,
Методы:
`pushPaymentDataToCash()` - добавляет в модель  выбранный вид платежа и адрес,
`checkValidity()` - проверяет факт ввода адреса и выбора вида платежа и активирует кнопку перехода к следующему экрану.

**SetContactsModal** - экран сабмита всей формы.
Поля:
`payment` - вид платежа,
`email` - почта пользователя, 
`phone` - телефон пользователя,
`address` - адрес пользователя,
`total` - сумма заказа, 
`items` - массив выбранных пользователем id карточек.

Методы:
`onInputChange()` - проверяет валидность введенных данных,
`render() `- отрисовывает сообщение о невалидности введенных данных.

**SuccessModal** - окно подтверждения успешной оплаты. Содержит переопределенный метод `goToTheNextStep`, который  в данном случае закрывает модальное окно, аналогично методу родительского класса `closeModal`.

## Интерфейсы

```ts
// интерфейс каталога, имплементируется классом CatalogPage
interface IcatalogPage {
  wrapper: HTMLElement;
  counter: HTMLElement;
  catalog: HTMLElement;
  basket: HTMLElement;
}
```

```ts
// интерфейс модального окна, имплементируется классом Modal
interface IModal {
  modalCloseButton: HTMLButtonElement;
  modalContent: HTMLElement;
  nextStepButton: HTMLButtonElement;
  openModal(): void;
  closeModal(): void;
  goToTheNextStep(): void;
  render(): HTMLElement
}
```

```ts
// интерфейс карточки товара, имплементируется классами Card и ItemModal
interface IItremData {
  id?: string;
  description?: string;
  image?: string;
  title: string;
  category?: string;
  price: number;
}
```

```ts
// интерфейс способа оплаты, имплементируется классом WayToPayModal
interface IPayment { 
  payment: "online" | "offline"; 
  address: string;
}
```

```ts
// интерфейс формы, имплементируется классом SetContactsModal
interface IOrder {
  payment: "online" | "offline";
  email: string;
  phone: string;
  address: string;
  total: number;
  items: [];
}
```
![Image alt](https://github.com/SaparovPetr/web-larek-frontend/blob/main/Larek3.jpg)
