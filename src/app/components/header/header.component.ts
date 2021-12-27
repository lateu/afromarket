import { Component, OnInit } from '@angular/core';
import {CartService} from "../../service/cart.service";
import {CartModelServer} from "../../models/Cart";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartData: CartModelServer | undefined;
  cartTotal: number | undefined;
  cartsize:number;
  constructor(public cartService: CartService) { 
    this.cartsize=this.cartData==undefined?0:this.cartData.data.length;
  }

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    this.cartService.cartData$.subscribe(data => this.cartData = data);
  }

}
