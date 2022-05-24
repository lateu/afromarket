export  interface  ProductModelServer{
  _id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  images: string;
}


export interface ServerResponse{
  //count:number
  itemCount:number;
  products: ProductModelServer[]
}

