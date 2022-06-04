import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';


declare let $:any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit,AfterViewInit {
  id=0;
  product:any;
  thumbImages:any[]=[];
  @ViewChild('quantity') quantityOrder:any;

  constructor(private productService:ProductService, private cartService:CartService,private route:ActivatedRoute) { }


  ngOnInit(): void {
   
    this.route.paramMap
    .pipe(
      map((param:ParamMap)=>{
              
        return param.get('id');
      })
    ).subscribe(prodId=>{
     
     
      this.productService.getSingleProduct(prodId).subscribe(prod=>{
        this.product=prod;
        
        if(prod.images!=null){
          this.thumbImages=prod.images.split(';');
        }
      })
    })
  }

  ngAfterViewInit(): void {
  	// Product Main img Slick
	$('#product-main-img').slick({
    infinite: true,
    speed: 300,
    dots: false,
    arrows: true,
    fade: true,
    asNavFor: '#product-imgs',
  });

	// Product imgs Slick
  $('#product-imgs').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    focusOnSelect: true,
		centerPadding: 0,
		vertical: true,
    asNavFor: '#product-main-img',
		responsive: [{
        breakpoint: 991,
        settings: {
					vertical: false,
					arrows: false,
					dots: true,
        }
      },
    ]
  });

	// Product img zoom
	var zoomMainProduct = document.getElementById('product-main-img');
	if (zoomMainProduct) {
		$('#product-main-img .product-preview').zoom();
	}
  }

  addToCart(id:number){
    let value=Number(this.quantityOrder.nativeElement.value);
    if(value>0){
      this.cartService.AddProductToCart(id.toString(),this.quantityOrder.nativeElement.value);
    }else{
      this.cartService.DeleteProductFromCart(id)
    }
    
  }
  Increase(){
    let value=Number(this.quantityOrder.nativeElement.value);
    if(this.product.quantity>=1){
      value++
      if(value>this.product.quantity){
        value=this.product.quantity;
      }
    }else{
      return;
    }
    this.quantityOrder.nativeElement.value=value.toString();
  }
  Decrease(){
    let value=Number(this.quantityOrder.nativeElement.value);
    if(this.product.quantity>0){
      value--
      if(value<1){
        value=1;
      }
    }else{
      return;
    }
    this.quantityOrder.nativeElement.value=value.toString();
  }

}
