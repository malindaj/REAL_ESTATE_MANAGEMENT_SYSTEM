import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthStateService} from "../../shared/auth-state.service";
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";
import {TokenService} from "../../shared/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors = null;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
  ) {
    this.loginForm = this.fb.group({
      email: [],
      password: []
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.authService.signin(this.loginForm.value).subscribe(
      result => {
        console.log('malinda');
        console.log(result);
        this.responseHandler(result);
      },
      error => {
        this.errors = error.error;
        console.log(error);
      },() => {
        this.authState.setAuthState(true);
        this.loginForm.reset();
        this.router.navigate(['user-dashboard']);
      }
    );
  }

  // Handle response
  responseHandler(data){
    this.token.handleData(data.access_token);
    console.log(data);
  }

}
