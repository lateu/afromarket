import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {CartModelPublic, CartModelServer} from "../models/Cart";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {NavigationExtras, Router} from "@angular/router";
import {ProductModelServer} from "../models/Product";
import { ProductService } from './product.service';
import { OrderService } from './order.service';
import { __values } from 'tslib';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private serverURL = environment.HOST;

//data variable too store the cart information on the client's local storage to be sent to the backend server as post datas
private cartDataclient:CartModelPublic={
  total:0,
  prodData:[{
    incart:0,
    id:0
  }]
};

//Data variable to store cart information on the server

private cartDataServer:CartModelServer={
  total:0,
  data:[{
    product:undefined,
    numInCart : 0,
    
    //product:{id:-1,name:'NO-Name',category:'',description:'',image:'',price:0,quantity:0,images:''}
  }]
}

/*Observable for components to subscribe */
cartTotal$=new BehaviorSubject<number>(0);
cartData$=new BehaviorSubject<CartModelServer>(this.cartDataServer);


constructor(private http:HttpClient, 
            private productservice:ProductService,
            private orderService:OrderService,
            private router:Router,
            private toast:ToastrService,
            private spinner:NgxSpinnerService
    ){
      this.cartTotal$.next(this.cartDataServer.total)
      this.cartData$.next(this.cartDataServer)

    // get the information from local storage (if any)

    let token=localStorage.getItem('cart')
    console.log("-------------cart service contructor access-1---")
 
    if(token!==null){
      console.log("-------------cart service contructor access-2--no empty cart-")
      let info: CartModelPublic=JSON.parse(token);

    // check if the info variable is null or has some data in it

    if(info!==null && info !== undefined && info.prodData[0].incart!==0){
      //Local storage is not empty and has some informations
      this.cartDataclient=info;

      // Loop through each entry and put it in the cartDataServer object
      this.cartDataclient.prodData.forEach(p=>{
         this.productservice.getSingleProduct(p.id).subscribe((actualProductInfo:ProductModelServer)=>{
           if(this.cartDataServer.data[0].numInCart==0){
             this.cartDataServer.data[0].numInCart=p.incart;
             this.cartDataServer.data[0].product=actualProductInfo;

             // todo create calculetotal function and replace it here
             this.CalculateTotal();
             this.cartDataclient.total=this.cartDataServer.total;

             localStorage.setItem('cart',JSON.stringify(this.cartDataclient))
           }else{
             //cart dataserver already has some entry in it

             this.cartDataServer.data.push({
               numInCart:p.incart,
               product:actualProductInfo
             });

             //todo  create calculateTotal function and replace it here
             this.CalculateTotal();
             this.cartDataclient.total=this.cartDataServer.total;
             localStorage.setItem('cart', JSON.stringify(this.cartDataclient))
           }
           this.cartData$.next({...this.cartDataServer})
         });

      });
    }
  }

    }


    AddProductToCart(id:number, quantity?:number){

      this.productservice.getSingleProduct(id).subscribe(prod=>{
      //if the cart is empty
      //console.log('+++++++++++++++++++++++++++AddProductToCart++++called+++with+++ +id='+id+" quanty="+quantity)
      if(this.cartDataServer.data[0].product===undefined){
       this.cartDataServer.data[0].product=prod;
        this.cartDataServer.data[0].numInCart=quantity!==undefined?quantity:1;
        

        this.CalculateTotal();
       
        this.cartDataclient.prodData[0].incart=this.cartDataServer.data[0].numInCart;
        this.cartDataclient.prodData[0].id=prod.id;
        this.cartDataclient.total=this.cartDataServer.total;
        localStorage.setItem('cart',JSON.stringify(this.cartDataclient));
        this.cartData$.next({...this.cartDataServer});
       
        this.toast.success(`${prod.name} added to the cart`,`Product added`, {
          timeOut:1500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right',
        })
      }else{

        // 2- if cart has some items

        let index=this.cartDataServer.data.findIndex(p=>p.product?.id===prod.id);  //-1 or a positive value
        
       
        // a- if that item is already in the cart=> index is positive value

        if(index!==-1){
          console.log('+++++++++++++++++++++++++++AddProductToCart++++add more+++++++++++++++++++++++')

          if(quantity!==undefined && quantity<=prod.quantity){
            this.cartDataServer.data[index].numInCart=this.cartDataServer.data[index].numInCart<prod.quantity?quantity:prod.quantity;

          }else{
            this.cartDataServer.data[index].numInCart<prod.quantity?this.cartDataServer.data[index].numInCart++:prod.quantity;
          }


          this.cartDataclient.prodData[index].incart=this.cartDataServer.data[index].numInCart;
          this.CalculateTotal();
          this.cartDataclient.total=this.cartDataServer.total;
          localStorage.setItem('cart',JSON.stringify(this.cartDataclient))
         
          this.toast.info(`${prod.name} updated in the cart`,`Product updated`, {
            timeOut:1500,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-top-right',
          })

        }else{
          //b- if that item is not in the cart
         
         this.cartDataServer.data.push({
           numInCart:1,
           product:prod
         });
         this.cartDataclient.prodData.push({
           incart:1,
           id:prod.id
         });
          console.log('+++++++++++++++++++++++++++AddProductToCart++++add new+++++++++++++++++++++++')
          //delete this.cartDataclient.prodData[0];
          console.log(this.cartDataclient.prodData[0])

    
         this.CalculateTotal();
         this.cartDataclient.total=this.cartDataServer.total;
         localStorage.setItem('cart',JSON.stringify(this.cartDataclient));
         this.cartData$.next({...this.cartDataServer});

          // TODO Display toast notification
          this.toast.success(`${prod.name} added to the cart`,`Product added`, {
            timeOut:1500,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-top-right',
          })        

         } // ENF OF ELSE


      }

      })

    }

UpdateCartItems(index:number,increase:boolean){
  let data=this.cartDataServer.data[index];
  if(increase){

    if(data.product){
      data.numInCart<data.product.quantity?data.numInCart++:data.product?.quantity;
      this.cartDataclient.prodData[index].incart=data.numInCart;
     //TODO CALCULATE TOTAL AMOUNT
     this.CalculateTotal();
     this.cartDataclient.total=this.cartDataServer.total;
     localStorage.setItem('cart',JSON.stringify(this.cartDataclient));
     this.cartData$.next({...this.cartDataServer});
    }
  }else{
    data.numInCart--;
    if(data.numInCart<1){
      this.DeleteProductFromCart(index);
      this.cartData$.next({...this.cartDataServer});  
    }else{
      this.cartData$.next({...this.cartDataServer}); 
      this.cartDataclient.prodData[index].incart=data.numInCart;
       //TODO CALCULATE TOTAL AMOUNT
       this.CalculateTotal();
       this.cartDataclient.total=this.cartDataServer.total;
       localStorage.setItem('cart',JSON.stringify(this.cartDataclient));
    }

  }

}

DeleteProductFromCart(index:number){

  if(window.confirm('Are you sure you want to remove the item?')){
    this.cartDataServer.data.splice(index,1);
    this.cartDataclient.prodData.splice(index,1);
    //TODO CALCULATE TOTAL AMOUNT
    
    this.CalculateTotal();
    this.cartDataclient.total=this.cartDataServer.total;
    if(this.cartDataclient.total===0){
      this.cartDataclient={prodData:[{incart:0,id:0,}],total:0}
      localStorage.setItem('cart',JSON.stringify(this.cartDataclient));
    }else{
      localStorage.setItem('cart',JSON.stringify(this.cartDataclient));
    }

    if(this.cartDataServer.total===0){
      //this.cartDataServer={total:0,data:[{numInCart:0,product:{id:0,name:'',category:'',description:'',image:'',price:0,quantity:0,images:''},}]};
      this.cartDataServer={total:0,data:[{numInCart:0,product:undefined}]};
      this.cartData$.next({...this.cartDataServer});
    }else{
      this.cartData$.next({...this.cartDataServer});
    }

  }else{
    // If the user click the cancel button
    return;
  }
}

private CalculateTotal(){
  let Total=0;

  
  this.cartDataServer.data.forEach(p=>{
    const {numInCart}=p;
    //const {price}=p.product;
    if(p.product!==undefined){
      Total+=numInCart*p.product.price;
    }
    
  })

  this.cartDataServer.total=Total;
  this.cartTotal$.next(this.cartDataServer.total);
}

public CheckOutFromCart(userId:Number){
  const body=JSON.stringify({userId:userId,
    products:this.cartDataclient.prodData
  })
  this.http.post(`${this.serverURL}/orders/payment`,null).subscribe((res:any /*original value res:{success:boolean}*/)=>{
  // console.clear();
  res.success=true;
  if(res.success){
    this.resetServerData();
    this.http.post(`${this.serverURL}/orders/new`,{userId:userId,
                                                  products:this.cartDataclient.prodData
                                                }).subscribe((data:any /**original value data:OrderResponse */)=>{
                                                  this.orderService.getSingleOrder(data.order_id).then(prods=>{
                                                    if(data.success){
                                                      const navigationExtras:NavigationExtras={
                                                        state:{
                                                          message:data.message,
                                                          products:prods,
                                                          orderId:data.order_id,
                                                          total:this.cartDataclient.total
                                                        }
                                                      };
                                                      //TODO HIDE SPINNER
                                                      this.spinner.hide().then();
                                                      this.router.navigate(['/thankyou'],navigationExtras).then(p=>{
                                                        this.cartDataclient={total:0,prodData:[{incart:0,id:0}]};
                                                        this.cartTotal$.next(0);
                                                        localStorage.setItem('cart',JSON.stringify(this.cartDataclient));
                                                      })
                                                    }else{
                                                      this.spinner.hide().then();
                                                      this.router.navigateByUrl('/checkout').then();
                                                      this.toast.error(`Sorry, failed to book the order`,`order status`, {
                                                        timeOut:1500,
                                                        progressBar:true,
                                                        progressAnimation:'increasing',
                                                        positionClass:'toast-top-right',
                                                      })
                                                    }

                                                  })
                                                 

                                                });
    
  }
  });

}

private resetServerData(){
  this.cartDataServer={
    total:0,
    data:[{
      numInCart:0,
      product:{id:0,name:'',category:'',description:'',image:'',price:0,quantity:0,images:''}
    }]
  };
}

CalculateSubTotal(index:number){
  let subTotal=0;
  const p=this.cartDataServer.data[index];

  if(p.product!==undefined){
    subTotal=p.product?.price*p.numInCart;
  }


  return subTotal;
}

 
}

interface OrderResponse{
  order_id:number;
  success:boolean;
  message:string;
  products:[{
    id:string,
    numInCart:string
  }];
}
