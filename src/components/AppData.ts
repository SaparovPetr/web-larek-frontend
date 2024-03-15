import {Model} from "./base/Model";
import {IAppState, IItemData, IOrder, IBasketData, IOrderForm, FormErrors} from "../types";
import {IEvents} from "./base/Events";

export class AppState extends Model<IAppState> {
  catalog: IItemData[];
  order: IOrder = {
    email: '',
    phone: '',
    items: [],
    payment: "online", //по умолчанию
    address: "",
    total: 0,
  };
  preview: string | null;
  formErrors: FormErrors = {};

  setCatalog(items: IItemData[]) {
    this.catalog = items.map(item => new Model(item, this.events)) as unknown as IItemData[];
    this.emitChanges('items:changed', { catalog: this.catalog });
  }
  setPreview(item: IItemData) {
    this.preview = item.id;
    this.emitChanges('preview:changed', item);
  }

  setOnlinePayWay() {
    this.order.payment = "online";
  }
  setOfflinePayWay() {
    this.order.payment = "offline";
  }
  
  setOrderField(field: keyof IOrderForm, value: string) {
    this.order[field] = value;

    if (this.validateOrder()) {
      this.events.emit('order:ready', this.order);
    }
  }
  
  validateOrder() {
    const errors: typeof this.formErrors = {};
    if (!this.order.email) {
        errors.email = 'Необходимо указать email';
    }
    if (!this.order.phone) {
        errors.phone = 'Необходимо указать телефон';
    }
    if (!this.order.address) {
      errors.address = 'Необходимо указать адрес';
    }
    this.formErrors = errors;
    this.events.emit('formErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }
}

export class BasketData extends Model<IBasketData>{
  basketArray: IItemData[];
  constructor(basketArray: IItemData[], protected events: IEvents) {
    super({}, events)
    this.basketArray = basketArray;
  } 
  addToBusket(item: IItemData) {
    this.basketArray.push(item);
    this.emitChanges('basket:changed', item);
  }
  removeFromBusket(item: IItemData) {
    this.basketArray.shift();
    this.emitChanges('basket:changed', item);
  }
  clearBasket(): void {
    this.basketArray = [];
    this.emitChanges('basket:changed');
  }
  makeSum(): number {
    let sum = 0;
    this.basketArray.forEach(element => {
      sum += element.price;     
    });
    return sum;
  }
}