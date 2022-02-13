import { Component, OnInit } from '@angular/core';

import {count} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

import {ProductService} from "../../service/product.service";
import { ProductModelServer, ServerResponse } from 'src/app/models/Product';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products :ProductModelServer[]=[];
  category="";
  constructor(private  _productServ:ProductService,private _cardService:CartService,private  router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    if(this.category===""){
      this.category="Food"
    }
    this._productServ.getAllProducts().subscribe((prods:ServerResponse)=>{
      //var json = JSON.parse(prods.valueOf(count()));
      //console.log('---------------HOME--------COMPON------------------------')
      //console.log(prods)
      //console.log(prods.products)
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
