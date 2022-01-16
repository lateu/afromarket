import { Component, Input, OnInit } from '@angular/core';
import {CartService} from "../../service/cart.service";
import {CartModelServer} from "../../models/Cart";
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartData: CartModelServer ;
  //@Input() cartData: CartModelServer|undefined;
  cartTotal:number ;
  //@Input() cartTotal: number|undefined;
  authState:boolean=false;
  constructor(public cartService: CartService,private userService:UserService) { 
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    
    //this.cartsize=this.cartData==undefined?0:this.cartData.data.length;
    //this.cartData=cartModelServer,
    //this.cartTotal=cartTotal
  }

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.userService.authState$.subscribe(authState=>{
      this.authState=authState;
    })
  }

}
