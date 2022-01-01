import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private products:ProductResponseModel[]=[];
  private Server_URL=environment.HOST

  constructor(private http:HttpClient) { }

  getSingleOrder(orderId:number){

    return this.http.get<ProductResponseModel[]>(this.Server_URL+'/orders/'+orderId).toPromise();
  }
}

interface ProductResponseModel{
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  quantityOrdered: number;
  images: string;

}
