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

