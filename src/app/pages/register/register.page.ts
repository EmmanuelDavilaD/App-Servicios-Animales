import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl, AbstractControl} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {PasswordValidator} from '../../validators/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  errorMessage = '';
  successMessage = '';

  validation_messages = {
    'email': [
      {type: 'required', message: 'Email requerido.'},
      {type: 'pattern', message: 'Email inválido.'}
    ],
    'password': [
      {type: 'required', message: 'Contraseña requerida.'},
      {type: 'minlength', message: 'Debe tener más de 5 dígitos.'}
    ],
    'confirmPassword': [
      {type: 'required', message: 'Contraseña requerida.'},
      {type: 'minlength', message: 'Debe tener más de 5 dígitos.'},
      {type: 'notMatch', message: 'Las contraseñas deben ser iguales.'}
    ],
    'localidad': [
      {type: 'required', message: 'Localidad es requerida.'},
      {type: 'minlength', message: 'Localidad es requerida.'}
    ]
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
        confirmPassword: new FormControl('', Validators.compose([
          Validators.minLength(5),
          Validators.required,
          PasswordValidator.MatchPassword
        ])),
        localidad: new FormControl('', Validators.compose([
          Validators.minLength(3),
          Validators.required
        ])),
        tipoMascota: new FormControl('')
      }
    );
  }

  tryRegister(value) {
    this.authService.doRegister(value)
      .then(res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Tu cuenta fue creada con exito';
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }

  goLoginPage() {
    this.router.navigate(['/login']);
  }

}
