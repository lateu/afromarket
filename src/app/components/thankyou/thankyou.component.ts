import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {
message="";
orderId=0;
//products:any;
products :ProductResponseModel[]=[];
cartTotal=0;
  constructor(private router:Router, private orderService:OrderService, private toast:ToastrService,
    private spinner:NgxSpinnerService) {
    const navigation=this.router.getCurrentNavigation();
    const state=navigation?.extras.state as{
      message:string,
      products:ProductResponseModel[],
      orderId:number,
      total:number
    };
    this.message=state.message;
    this.orderId=state.orderId;
    this.products=state.products;
    this.cartTotal=state.total;
    //console.log("--------tks com-----------------state-----------------")
    //console.log(state)
    //console.log(this.products)

   }

  ngOnInit(): void {
    this.toast.success(this.message,`Order added`, {
      timeOut:1500,
      progressBar:true,
      progressAnimation:'increasing',
      positionClass:'toast-top-right',
    })
   
  }

}

interface ProductResponseModel{
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  incart: number;
  image: string;
}
