import { Component, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/models/Cart';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartData={} as CartModelServer ;
  cartTotal=0 ;
  subTotal=0;

  constructor(public cartService:CartService) { }

  ngOnInit(): void {
    this.cartService.cartData$.subscribe((data:CartModelServer)=>this.cartData=data);
    this.cartService.cartTotal$.subscribe(total=>this.cartTotal=total);
  }

  ChangeQuantity(index:number,increase:boolean){
    this.cartService.UpdateCartItems(index,increase);
  }

}
