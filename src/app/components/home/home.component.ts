import { Component, Input, OnInit } from '@angular/core';

import {count} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

import {ProductService} from "../../service/product.service";
import { ProductModelServer, ServerResponse } from 'src/app/models/Product';
import { CartService } from 'src/app/service/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products :ProductModelServer[]=[];
  category="";
  SERVER_URL = environment.HOST;
  @Input() id: string="";
  //photo_url:string=this.SERVER_URL+"/product/photo/6271c0eb5ae80cf682ce332c"
  photo_url:string=this.SERVER_URL+"/product/photo/"+this.id;
  constructor(private  _productServ:ProductService,private _cardService:CartService,private  router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    if(this.category===""){
      this.category="Food"
    }
    this._productServ.getAllProducts().subscribe((prods:ServerResponse)=>{
      //var json = JSON.parse(prods.valueOf(count()));
      /*console.log('---------------HOME--------COMPON------------------------')
      console.log(prods)
      console.log(prods.products)*/
      this.products=prods.products;
    })
    }


  selectedProduct(id: string) {
    this.router.navigate(['/product',id]).then()
  }

  AddToCart(id: string) {
    this._cardService.AddProductToCart(id);
  }

}
