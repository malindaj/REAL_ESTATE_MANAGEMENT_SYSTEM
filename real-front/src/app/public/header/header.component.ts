import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import {Router} from '@angular/router';
import {AuthService} from '../../shared/auth.service';
import {TokenService} from '../../shared/token.service';
import {AuthStateService} from '../../shared/auth-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  registerForm: FormGroup;
  loginForm: FormGroup;
  errors = null;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      username: [''],
      password: [''],
      password_confirmation: [''],
      role_id: 3
    });
    this.loginForm = this.fb.group({
      email: [],
      password: []
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe(
      result => {
        console.log(result);
      },
      error => {
        this.errors = error.error;
      },
      () => {
        this.registerForm.reset()
        this.router.navigate(['login']);
      }
    )
  }
  onSubmitLogin() {
    this.authService.signin(this.loginForm.value).subscribe(
      result => {
        this.responseHandler(result);
      },
      error => {
        this.errors = error.error;
      },() => {
        this.authState.setAuthState(true);
        this.loginForm.reset()
        this.router.navigate(['home']);
      }
    );
  }
  responseHandler(data){
    this.token.handleData(data.access_token);
  }

}
