import { Api, ApiListResponse } from './base/api';
import { IItemData } from '../types/index';


export class LarekApi extends Api {
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  
  getLotItem(id: string): Promise<IItemData> {
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


  



  
}



// import { Api, ApiListResponse } from './base/api';
// import { IItemData } from '../types/index';


// // export interface IAuctionAPI {
// //   getItemList: () => Promise<IItemData[]>;
// //   getLotItem: (id: string) => Promise<IItemData>;

// // }

// export class LarekApi extends Api {
//   readonly cdn: string;

//   constructor(cdn: string, baseUrl: string, options?: RequestInit) {
//     super(baseUrl, options);
//     this.cdn = cdn;
//   }

//   getItemList(): Promise<IItemData[]>  {
//     return this.get('/product/').then((data: ApiListResponse<IItemData>) =>
//         data.items.map((item) => ({
//             ...item,
//             image: this.cdn + item.image
//         }))
//     );
//   }


// //   getLotItem(id: string): Promise<IItemData> {
// //     return this.get(`/lot/${id}`).then(
// //         (item: IItemData) => ({
// //             ...item,
// //             image: this.cdn + item.image,
// //         })
// //     );
// // }



  
// }







