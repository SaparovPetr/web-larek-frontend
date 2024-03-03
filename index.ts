
// интерфейс каталога 
interface IcatalogPage {
  wrapper: HTMLElement;
  counter: HTMLElement;
  catalog: HTMLElement;
  basket: HTMLElement;
}

// интерфейс модального окна 
interface IModal {
  modalCloseButton: HTMLButtonElement;
  modalContent: HTMLElement;
  nextStepButton: HTMLButtonElement;
  openModal(): void;
  closeModal(): void;
  goToTheNextStep(): void;
  render(): HTMLElement
}

// интерфейс карточки товара 
interface IItremData {
  id?: string;
  description?: string;
  image?: string;
  title: string;
  category?: string;
  price: number | string;
}

// интерфейс корзины
interface IBasket {
  listWithItems: IItremData[];
  getList(): void;
  removeItem(): IItremData[];
  calculateTotalPrice(): number;
}

// интерфейс способа оплаты
interface IPayment { 
  payment: "online" | "offline"; 
  address: string;
}

// интерфейс формы
interface IOrder {
  payment: "online" | "offline";
  email: string;
  phone: string;
  address: string;
  total: number;
  items: [];
}