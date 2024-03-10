
import {Model} from "./base/Model";
import {IAppState, IItemData, FormErrors} from "../types";
import {IEvents} from "./base/events";

export type CatalogChangeEvent = {
  catalog: ItemData[]
};

export class ItemData extends Model<IItemData> {
  id?: string;
  description?: string;
  image?: string;
  title: string;
  category?: string;
  price: number | null;
}


export class AppState extends Model<IAppState> {
  catalog: ItemData[];
  basket: object[];
  order: IOrder = {
    email: '',
    phone: '',
    items: [],
    payment: "online",
    address: "",
    total: 0
  };
  preview: string | null;
  formErrors: FormErrors = {};


  setCatalog(items: IItemData[]) {
    this.catalog = items.map(item => new ItemData(item, this.events));
    this.emitChanges('items:changed', { catalog: this.catalog });
  }

  setPreview(item: ItemData) {
    this.preview = item.id;
    this.emitChanges('preview:changed', item);
  }


}

// подумать снова, как уналследоваться от модели вместо создания метода emitChanges
export class BasketData {
  basketArray: ItemData[];
  item: ItemData;
  constructor(basketArray: ItemData[], protected events: IEvents) {
    this.basketArray = basketArray;
  }
  emitChanges(event: string, payload?: object) {
    this.events.emit(event, payload ?? {});
  }
  addToBusket(item: ItemData) {
    this.basketArray.push(item);
    this.emitChanges('basket:changed', item);
  }
  removeFromBusket(item: ItemData) {
    this.basketArray.pop();
    this.emitChanges('basket:changed', item);
  }
  makeSum(): number {
    let sum = 0;
    this.basketArray.forEach(element => {
      sum += element.price;     
    });
    return sum;
  }
 
}