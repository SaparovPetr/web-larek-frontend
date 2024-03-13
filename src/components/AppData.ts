
import {Model} from "./base/Model";
import {IAppState, IItemData, IOrder, IBasketData} from "../types";
import {IEvents} from "./base/events";

export type CatalogChangeEvent = {
  catalog: ItemData[];
};

export class ItemData extends Model<IItemData> {
  private _id?: string;
  private _description?: string;
  private _image?: string;
  private _title: string;
  private _category?: string;
  private _price: number | null;

  constructor(data?: Partial<IItemData>, events?: IEvents) {
    super(data, events);
    this._id = data?.id;
    this._description = data?.description;
    this._image = data?.image;
    this._title = data?.title || '';
    this._category = data?.category;
    this._price = data?.price || null;
  }

  get id(): string | undefined {
    return this._id;
  }
  set id(value: string | undefined) {
    this._id = value;
  }

  get description(): string | undefined {
    return this._description;
  }
  set description(value: string | undefined) {
    this._description = value;
  }

  get image(): string | undefined {
    return this._image;
  }
  set image(value: string | undefined) {
    this._image = value;
  }

  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
  }

  get category(): string | undefined {
    return this._category;
  }
  set category(value: string | undefined) {
    this._category = value;
  }

  get price(): number | null {
    return this._price;
  }
  set price(value: number | null) {
    this._price = value;
  }
}

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
    this.catalog = items.map(item => new ItemData(item, this.events));
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
  constructor(basketArray: ItemData[], protected events: IEvents) {
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
