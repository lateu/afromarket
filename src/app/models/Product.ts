export  interface  ProductModelServer{
  _id: string;
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

