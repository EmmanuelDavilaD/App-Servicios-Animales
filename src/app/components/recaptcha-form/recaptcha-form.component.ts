import { Component, OnInit } from '@angular/core';

export interface FormModel {
  captcha?: string;
}

@Component({
  selector: 'app-recaptcha-form',
  styleUrls: ['./recaptcha-form.component.scss'],
  templateUrl: './recaptcha-form.component.html'
})
export class RecaptchaFormComponent implements OnInit {
  public formModel: FormModel = {};

  constructor() { }

  ngOnInit() {
  }
}
