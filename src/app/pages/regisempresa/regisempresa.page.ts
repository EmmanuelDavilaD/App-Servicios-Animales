import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormControl} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-regisempresa',
  templateUrl: './regisempresa.page.html',
  styleUrls: ['./regisempresa.page.scss'],
})
export class RegisempresaPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    'email': [
      {type: 'required', message: 'Correo Electronico es Requerido.'},
      {type: 'pattern', message: 'Inserte un Correo Electronico Real.'}
    ],
    'password': [
      {type: 'required', message: 'Contraseña Requerida.'},
      {type: 'minlength', message: 'La Contraseña debe tener mas de 5 digitos.'}
    ],
    'confirmarPassword': [
      {type: 'required', message: 'Confirmar Contraseña Requerida.'},
      {type: 'minlength', message: 'la Contraseña debe ser igual.'}
    ],
    'localidad': [
      {type: 'required', message: 'Localidad es Requerida.'},
      {type: 'minlength', message: 'Localidad es Requerida.'}
    ],
    'cif': [
      {type: 'required', message: 'Numero Cif Requerido.'},
      {type: 'minlength', message: 'Numero CIF Requerido .'}
    ],
    'colegiado': [
      {type: 'required', message: 'Numero de Colegiado Requerido.'},
      {type: 'minlength', message: 'Numeor de Colegiado .'}
    ],
    'telefono': [
      {type: 'required', message: 'Numero de Telefono Requerido.'},
      {type: 'minlength', message: 'Numero de Telefono .'}
    ],
    'captcha': [
      {type: 'required', message: 'Captcha Requerido.'}
    ],
  };

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      confirmarPassword: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      localidad: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])),
      cif: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])),
      colegiado: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])),
      telefono: new FormControl('', Validators.compose([
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.required
      ])),
      captcha: new FormControl('', Validators.compose([
        //Validators.required
      ])),
    });
  }

  tryRegister(value) {
    this.authService.doRegisterUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Your account has been created. Please log in.';
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }

  goLoginPage() {
    this.router.navigate(['/loginempresa']);
  }

}
