
// интерфейс каталога 
export interface IcatalogPage {
  wrapper: HTMLElement;
  counter: HTMLElement;
  catalog: HTMLElement;
  basket: HTMLElement;
}

// интерфейс модального окна 
export interface IModal {
  modalCloseButton: HTMLButtonElement;
  modalContent: HTMLElement;
  nextStepButton: HTMLButtonElement;
  openModal(): void;
  closeModal(): void;
  goToTheNextStep(): void;
  render(): HTMLElement
}

// интерфейс карточки товара 
export interface IItemData {
  id?: string;
  description?: string;
  image?: string;
  title: string;
  category?: string;
  price: number | string;
  itemIndex: number;
}

// // интерфейс корзины
// export interface IBasket {
//   listWithItems: IItremData[];
//   getList(): void;
//   removeItem(): IItremData[];
//   calculateTotalPrice(): number;
// }

// интерфейс способа оплаты
export interface IPayment { 
  payment: "online" | "offline"; 
  address: string;
}

// интерфейс формы
export interface IOrder {
  payment: "online" | "offline";
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}



export interface IAppState {
  catalog: IItemData[];
  basket: string[];
  order: IOrder | null;
}


export type FormErrors = Partial<Record<keyof IOrder, string>>;








export interface IOrderResult {
  id: string;
  total: number;
}




























// // интерфейс каталога 
// export interface IcatalogPage {
//   wrapper: HTMLElement;
//   counter: HTMLElement;
//   catalog: HTMLElement;
//   basket: HTMLElement;
// }

// // интерфейс модального окна 
// export interface IModal {
//   modalCloseButton: HTMLButtonElement;
//   modalContent: HTMLElement;
//   nextStepButton: HTMLButtonElement;
//   openModal(): void;
//   closeModal(): void;
//   goToTheNextStep(): void;
//   render(): HTMLElement
// }

// // интерфейс карточки товара 
// export interface IItemData<T> {
//   id?: string;
//   description?: string;
//   image?: string;
//   title: string;
//   category?: string;
//   price: number | null;
// }

// // интерфейс корзины
// export interface IBasket {
//   listWithItems: IItremData[];
//   getList(): void;
//   removeItem(): IItremData[];
//   calculateTotalPrice(): number;
// }

// // интерфейс способа оплаты
// export interface IPayment { 
//   payment: "online" | "offline"; 
//   address: string;
// }

// // интерфейс формы
// export interface IOrder {
//   payment: "online" | "offline";
//   email: string;
//   phone: string;
//   address: string;
//   total: number;
//   items: [];
// }



// export interface IAppState {
//   catalog: IItemData[];
//   basket: string[];
//   preview: string | null;
//   order: IOrder | null;
// }

