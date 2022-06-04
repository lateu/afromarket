import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {

  url: string="http://localhost:8000/api/product/photo/6271c0eb5ae80cf682ce332c";

  SERVER_URL = environment.HOST;
  @Input() id: any;
  @Input() name:string=""
  //photo_url:string=this.SERVER_URL+"/product/photo/6271c0eb5ae80cf682ce332c"
  photo_url:string;

  constructor(private  router:Router) { }

  ngOnInit(): void {
    this.photo_url=this.SERVER_URL+"/product/photo/"+this.id;
  }

  selectedProduct(id: string) {
    this.router.navigate(['/product',id]).then()
  }

}
