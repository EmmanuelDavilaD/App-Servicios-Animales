import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recaptcha',
  template: `<re-captcha (resolved)="resolved($event)" siteKey="6LfumpwUAAAAANzNKkGmkR3H5ouPQorWVdDOKQph"></re-captcha>`
})

export class RecaptchaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

}
