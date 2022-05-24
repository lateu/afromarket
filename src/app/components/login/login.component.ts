import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
//import {AuthService} from 'angularx-social-login';
import {ActivatedRoute, Router} from '@angular/router';
import { environment } from 'src/environments/environment';
//import { SocialAuthService,GoogleLoginProvider } from 'angularx-social-login';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
email:string='';
password:string='';
  constructor(/*private authService: SocialAuthService,*/
   private router:Router,
   private userService:UserService,
   private route:ActivatedRoute,private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.userService.authState$.subscribe(authState => {
      if (authState) {
        this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'] || '/profile');
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }

  signInWithGoogle(): void {
   /// this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  login(form: NgForm) {
    const email = this.email;
    const password = this.password;

    if (form.invalid) {
      return;
    }

    form.reset();
  this.userService.loginUser(email, password);
  
  }

}
