import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/auth.service";
import {User} from "../../shared/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errors = null;
  img: File = null;
  fileName = '';

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      phone_number: [''],
      bio: [''],
      password: [''],
      password_confirmation: ['']
    });
  }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];

    console.log(event);
    console.log('--------------');
    console.log(file.name);
    if(file) {
      this.fileName = file.name;
      this.img = file;
    }
    console.log(this.fileName);
  }

  onSubmit() {
    const uploadData = new FormData();
    uploadData.append('image',this.img);
    uploadData.append('name',this.registerForm.value.name);
    uploadData.append('email',this.registerForm.value.email);
    uploadData.append('phone_number',this.registerForm.value.phone_number);
    uploadData.append('bio',this.registerForm.value.bio);
    uploadData.append('role_id','2' );
    uploadData.append('password',this.registerForm.value.password);
    uploadData.append('password_confirmation', this.registerForm.value.password_confirmation);
    console.log(this.registerForm.value);
    console.log(uploadData);
    this.authService.register(uploadData).subscribe(
      result => {
        console.log(result);
      },
      error => {
        this.errors = error.error;
      },
      () => {
        this.registerForm.reset();
        this.router.navigate(['login']);
      }
    );
  }

}
