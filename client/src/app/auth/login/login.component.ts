import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { OauthService } from '../../services/oauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  firstLoad: boolean = true;
  credentials: FormGroup;
  submitted = false;
  error_Message;
  error = false;
  notCheck = true;
  token;
  verifying:boolean=false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private oauthService: OauthService
  ) {
    this.token = localStorage.getItem("token");
    this.credentials = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    })
  }

  ngOnInit(): void {
    if (this.token) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['/']);
      localStorage.removeItem("token");
    }
  }

  get f() { return this.credentials.controls; }

  
  classEmailForValidation() {
    if (this.firstLoad) {
      return
    }
    else if (this.submitted && this.f.email.errors) {
      return 'is-invalid'
    } else {
      return 'is-valid'
    }
  }

  classPasswordForValidation() {
    if (this.firstLoad) {
      return
    }
    else if (this.submitted && this.f.password.errors) {
      return 'is-invalid'
    } else {
      return 'is-valid'
    }
  }


  loginUser() {
    this.spinner.show();
    this.verifying = true;
    this.submitted = true;
    this.firstLoad = false;
    if (this.notCheck) {
      if (this.credentials.invalid) {
        this.verifying = false;
        this.spinner.hide();
        return;
      }
    }
    this.oauthService.loginUser(this.credentials.value).subscribe((response: any) => {
      if (response['responseCode'] === 400 || response['error']) {
        this.verifying = false;
        this.error = true;
        this.error_Message = response['message'];
        this.spinner.hide();
        console.log(response);
      } else if (response["responseCode"] == 200) {
        this.error = false;
        var token = response.Token;
        localStorage.setItem("token", token);
        var id = response.result.id;
        var email = response.result.email;
        localStorage.setItem("id", id);
        localStorage.setItem("email", email);
        this.router.navigate(['home']);
        this.spinner.hide();
        console.log(response);
      }
    }, (err) => {
      this.error = true;
      this.verifying = false;
      this.spinner.hide();
      console.log(err);
    })
  }
}
