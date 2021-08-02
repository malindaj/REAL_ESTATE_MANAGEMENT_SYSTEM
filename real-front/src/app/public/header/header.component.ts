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
  isSignedIn: boolean;

  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
  ) {}

  ngOnInit(): void {
    this.auth.userAuthState.subscribe(val => {
      this.isSignedIn = val;
    });
  }

  // Signout
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }


}
