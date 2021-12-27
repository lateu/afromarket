import { Component, OnInit } from '@angular/core';

import {count} from "rxjs/operators";
import {Router} from "@angular/router";

import {ProductService} from "../../service/product.service";
import { ProductModelServer, ServerResponse } from 'src/app/models/Product';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products :ProductModelServer[]=[];
  constructor(private  _productServ:ProductService,private _cardService:CartService,private  router:Router) { }

  ngOnInit(): void {
    this._productServ.getAllProducts().subscribe((prods:ServerResponse)=>{
      //var json = JSON.parse(prods.valueOf(count()));
     // console.log(prods)
     // console.log(prods.products)
      this.products=prods.products;
    })
    }


  selectedProduct(id: number) {
    this.router.navigate(['/product',id]).then()
  }

  AddToCart(id: number) {
    this._cardService.AddProductToCart(id);
  }

}
