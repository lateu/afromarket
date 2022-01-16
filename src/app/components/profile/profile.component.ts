import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { map } from 'rxjs/operators';
import { ResponseModel, UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  myUser:any;

  constructor(private authService: SocialAuthService,
    private router:Router,
    private userService:UserService) { }

  ngOnInit(): void {
    this.userService.userData$
    .pipe(
      map(user=>{
        if(user instanceof SocialUser){
          return {
          ...user,
          email:'richardauscard@gmail.com'
          };
        }else{
          return user;
        
        }
      })
    ).subscribe((data:any /*init data:ResponseModel| SocialUser*/)=>{
      
      this.myUser=data;
 
    });
  }
  logout(){
    this.userService.logout();
  }

}
