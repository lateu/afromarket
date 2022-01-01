import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductModelServer, ServerResponse} from "../models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private SERVER_URL = environment.HOST;
  constructor(private http: HttpClient) { }

  /* This is to fetch all products from the backend server */
  getAllProducts(numberOfResults= 10) : Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL+'/index.php?ctl=productCtl', {
      params: {
        limit: numberOfResults.toString()
      }
    });
  }
  /*
  getAllProducts(numberOfResults= 10) : Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL+'/products', {
      params: {
        limit: numberOfResults.toString()
      }
    });
  }*/

  /* GET SINGLE PRODUCT FROM SERVER*/
  getSingleProduct(id: number): Observable<ProductModelServer> {
    if(id===undefined){id=1;}
    return this.http.get<ProductModelServer>(this.SERVER_URL + '/index.php?ctl=productCtl&id=' + id);
  }
/*
  getSingleProduct(id: number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(this.SERVER_URL + '/products/' + id);
  }*/

  /*GET PRODUCTS FROM ONE CATEGORY */
  getProductsFromCategory(catName: string) : Observable<ProductModelServer[]>  {
    return this.http.get<ProductModelServer[]>(this.SERVER_URL + '/products/category/' + catName);
  }
}
