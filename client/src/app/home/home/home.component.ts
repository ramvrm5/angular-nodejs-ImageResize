import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { ImageService } from '../../services/image.service';
import { getImage } from '../../../../../server/handler/imageHandler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public userName: String
  firstLoad: boolean = true;
  credentials: FormGroup;
  submitted = false;
  pattern = /^(http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  emptyImage;
  openImage;
  errorInRequest: String = "";
  error: boolean = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private imageService: ImageService
  ) {
    this.userName = localStorage.getItem("email");
    this.credentials = this.formBuilder.group({
      link: ['', [Validators.required, Validators.pattern(this.pattern)]],
    })
    this.emptyImage = "assets/images/emptyImage.png";
    this.openImage = this.emptyImage;
  }

  ngOnInit(): void {
    this.getImage();
  }

  getImage() {
    this.spinner.show();
    let data = {
      "userId": localStorage.getItem("id")
    }
    let token = localStorage.getItem("token");
    this.imageService.getImage(data, token).subscribe((response: any) => {
      if (response['error']) {
        this.spinner.hide();
        this.errorInRequest = "something went wrong";
        this.error = true;
        setTimeout(() => {
          this.errorInRequest = ""
          this.error = false;
        }, 3000);
      } else if (response["responseCode"] == 200) {
        if (response.result.length > 0) {
          this.emptyImage = response.result[0].baseUrl;
          this.openImage = response.result[0].link;
        }
        this.spinner.hide();
      }
    }, (err) => {
      this.spinner.hide();
      this.errorInRequest = "Please check connection";
      this.error = true;
      setTimeout(() => {
        this.errorInRequest = ""
        this.error = false;
      }, 3000);
    })
  }

  get h() { return this.credentials.controls; }

  classForValidation(type) {
    if (this.firstLoad) {
      return
    }
    else if (this.submitted && this.h.link.errors && (type == 'link')) {
      return 'is-invalid';
    } else {
      return 'is-valid';
    }
  }

  onSubmit() {
    this.spinner.show();
    this.firstLoad = false;
    this.submitted = true;
    if (this.credentials.invalid) {
      this.spinner.hide();
      return;
    }
    let data = {
      "link": this.credentials.value.link,
      "userId": localStorage.getItem("id")
    }
    let token = localStorage.getItem("token");
    this.imageService.imageResize(data, token).subscribe((response: any) => {
      if (response['error']) {
        this.spinner.hide();
        this.errorInRequest = "something went wrong";
        this.error = true;
        setTimeout(() => {
          this.errorInRequest = ""
          this.error = false;
        }, 3000);
      } else if (response["responseCode"] == 200) {
        this.emptyImage = response.result;
        this.openImage = response.openimage;
        this.spinner.hide();
      }
    }, (err) => {
      this.errorInRequest = "Invalid URL";
      this.error = true;
      setTimeout(() => {
        this.errorInRequest = ""
        this.error = false;
      }, 3000);
      this.spinner.hide();
    })
  }

  onlogout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
