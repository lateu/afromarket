import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
//import {AuthService} from 'angularx-social-login';
import {ActivatedRoute, Router} from '@angular/router';
//import { SocialAuthService,GoogleLoginProvider } from 'angularx-social-login';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  email:string='';
  password:string='';
  name:string='';
  constructor(private router:Router,
    private userService:UserService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.userData$.subscribe((data:any) => {
      console.log("-*----------------signUpUser---init---data----")
      console.log(data!==null);
      if (data) {
        console.log("-*---------------1---")
        this.router.navigateByUrl( '/login');
      } else {
        console.log("-*---------------2---")
        this.router.navigateByUrl('/signup');
      }
    });
  }

  signup(form: NgForm) {
    const email = this.email;
    const password = this.password;
    const name = this.name;
    //console.log(email+"/"+name+"/"+password)

    if (form.invalid) {
      return;
    }

    form.reset();
   this.userService.signUpUser(name,email, password);
   /*this.userService.userData$.subscribe(data=>{
    console.log("-*----------------signUpUser------data----")
    console.log(data);
   })*/
   
  }

}
