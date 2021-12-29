import { Component, OnInit } from '@angular/core';
import {CartService} from "../../service/cart.service";
import {CartModelServer} from "../../models/Cart";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartData={} as CartModelServer ;
  cartTotal=0 ;
  //cartsize:number;
  constructor(public cartService: CartService) { 
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    //this.cartsize=this.cartData==undefined?0:this.cartData.data.length;
    //this.cartData=cartModelServer,
    //this.cartTotal=cartTotal
  }

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    this.cartService.cartData$.subscribe(data => this.cartData = data);
  }

}
