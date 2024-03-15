/**интерфейс заказа  */
export interface IOrder {
  payment: "online" | "offline";
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}
/**интерфейс состояния всего приложения  */
export interface IAppState {
  catalog: IItemData[];
  order: IOrder | null;
  preview: string | null;
}

/**интерфейс состояния корзины  */
export interface IBasketData {
  basketArray: IItemData[];
}

/**интерфейс ответа сервера на сделанный заказ */
export interface IOrderResult {
  id: string;
  total: number;
}

/**интерфейс данных товара */
export interface IItemData {
  id?: string;
  description?: string;
  image?: string;
  title: string;
  category?: string;
  price: number | null;
  itemIndex?: number;
}

/**интерфейс для каталога */
export interface IcatalogPage {
  counter: number;
  catalog: HTMLElement[];
  wrapper: HTMLElement;
  basket: HTMLElement;
  locked: boolean;
}

/**общий интерфейс действий для всех типов карточек */
export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

/**интерфейс карточки превью  */
export interface IPreviewItem {
  description: HTMLElement;
  buyButton: HTMLButtonElement;
}

/**интерфейс действий в корзине */
export interface IBasketActions {
  onClick: (event: MouseEvent) => void;
}
/**интерфейс корзины */
export interface IBasket {
  ul: HTMLElement[];
  counter: number;
}

/**интерфейс модального окна */
export interface IModalData {
  content: HTMLElement;
}

/**интерфейс страницы успеха */
export interface ISuccessPage {
  onClick: (event: MouseEvent) => void;
}

/** потенициальные ошибки валидации формы */
export type FormErrors = Partial<Record<keyof IOrder, string>>;

/** состояние формы */ 
export interface IFormState {
  valid: boolean;
  errors: string[];
}

/** интерфейс формы контактов*/
export interface IOrderForm {
  email: string;
  phone: string;  
}

/** интерфейс формы с адресом и способом оплаты */
export interface IDeliveryForm {
  payCard: string;
  payCash: string;  
  address: string;
  payment: string;
}