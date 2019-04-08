import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PatrocinadoresComponent} from './patrocinadores/patrocinadores.component';
import {RecaptchaComponent} from './recaptcha/recaptcha.component';
import {RecaptchaModule} from 'ng-recaptcha';
import {RecaptchaFormsModule} from 'ng-recaptcha/forms';
import {RecaptchaFormComponent} from './recaptcha-form/recaptcha-form.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [PatrocinadoresComponent, RecaptchaComponent, RecaptchaFormComponent],
  exports: [
    PatrocinadoresComponent, RecaptchaComponent, RecaptchaFormComponent
  ],
  imports: [
    CommonModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FormsModule,
  ]
})
export class ComponentsModule {
}
