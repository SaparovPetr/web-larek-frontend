
import {Model} from "./base/Model";
import {IAppState, IItemData, IOrder, IBasketData} from "../types";
import {IEvents} from "./base/Events";

export type CatalogChangeEvent = {
  catalog: IItemData[];
};


export class AppState extends Model<IAppState> {
  catalog: IItemData[];
  order: IOrder = {
    email: '',
    phone: '',
    items: [],
    payment: "online",
    address: "",
    total: 0,
  };
  preview: string | null;

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