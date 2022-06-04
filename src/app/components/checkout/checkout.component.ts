import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartModelServer } from 'src/app/models/Cart';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartData={} as CartModelServer ;
  cartTotal=0 ;

  constructor(private cartService:CartService,
              private orderService:OrderService,
              private router:Router,
              private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.cartService.cartData$.subscribe((data:CartModelServer)=>{this.cartData=data});
    this.cartService.cartTotal$.subscribe(total=>{this.cartTotal=total});
  }

  doCheckout(){
    this.spinner.show().then(p=>{
 
      console.log("-*-------doCheckout------called--")
      


      try {
        const loginData=JSON.parse(localStorage.getItem("jwt")) 
        const userId=loginData["user"]['_id']
      } catch (error) {
        this.router.navigateByUrl('/login')
      }

      
     

      //this.cartService.CheckOutFromCart(userId);
      this.cartService.CheckOutFromCart();
    })


  }

}
