import { Api, ApiListResponse } from './base/api';
import { IItemData, IOrder, IOrderResult } from '../types/index';

export class LarekApi extends Api {
  readonly cdn: string;
  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }
  
  getOneItem(id: string): Promise<IItemData> {
    return this.get(`/product/${id}`).then(
        (item: IItemData) => ({
            ...item,
            image: this.cdn + item.image,
        })
    );
  }

  getItemList(): Promise<IItemData[]> {
    return this.get('/product/').then((data: ApiListResponse<IItemData>) =>
        data.items.map((item) => ({
            ...item,
            image: this.cdn + item.image
        }))
    );
  }

  orderItems(order: IOrder): Promise<IOrderResult> {
    return this.post('/order/', order).then(
        (data: IOrderResult) => data
    );
  }  
}