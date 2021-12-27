import {ProductModelServer} from "./Product";

export interface CartModelServer {
  total: number;
  data: [{
    product: ProductModelServer|undefined,
    numInCart: number
  }];
}

export interface CartModelPublic {
  total: number;
  prodData: [
    {
      id: number,
      incart: number
    }
  ];
}
