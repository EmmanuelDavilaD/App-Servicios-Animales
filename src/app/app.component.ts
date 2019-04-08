import { AuthService } from './services/auth.service';
import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {Router} from '@angular/router';
import {timer} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})

export class AppComponent implements OnInit{
  public isAdmin: any = null;
  public userUid: string = null;
  public isEmpresa: any = null;
showSplash = true;

  public appPages = [
    {
      title: 'Iniciar Sesión',
      url: '/login',
      icon: 'paw'
    },
    {
      title: 'Peluquerias',
      url: '/list-users/peluqueria',
      icon: 'paw'
    },
    {
      title: 'Veterinarias',
      url: '/list-users/veterinaria',
      icon: 'paw'
    },
    {
      title: 'Tiendas',
      url: '/list-users/tienda',
      icon: 'paw'
    },
    {
      title: 'Adiestramiento',
      url: '/list-users/adiestramiento',
      icon: 'paw'
    },
    {
      title: 'Residencias',
      url: '/list-users/residencia',
      icon: 'paw'
    },
    {
      title: 'Adoptame',
      url: '/list-users/adopcion',
      icon: 'paw'
    },
    {
      title: 'Campañas',
      url: '/list-users/otros',
      icon: 'paw'
    },
    {
      title: 'Pagina Principal',
      url: '/home-app',
      icon: 'paw'
    }
  ];
  
  ngOnInit() {
    this.getCurrentUser();
    this.getCurrentUser2();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = userRole && Object.assign({}, userRole.roles).hasOwnProperty('admin') || false;
          // this.isAdmin = true;
        })
      }
    })
  }

  getCurrentUser2() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isEmpresa =  userRole && Object.assign({}, userRole.roles).hasOwnProperty('empresas') || false;
          // this.isAdmin = true;
        })
      }
    })
  }

  nuevaEmpresa(){
    this.router.navigate(['/categories'])
  }

  adminPage(){
    this.router.navigate(['/administrador'])
  }

  logout() {
    this.authService.doLogout()
    .then(res => {
      this.router.navigate(['/home-pp']);
    }, err => {
      console.log(err);
    });
  }
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public afAuth: AngularFireAuth,
    private authService: AuthService,
  ) {
    this.initializeApp();
  }
  public isLogged: boolean = false;

  initializeApp() {
    this.platform.ready().then(() => {
      this.afAuth.user.subscribe(user => {
        if (user) {
          this.isLogged = true;
          this.router.navigate(['/home-app']);
        } else {
          this.router.navigate(['/home-app']);
        }
      }, err => {
        this.router.navigate(['/home-app']);
      }, () => {
        this.splashScreen.show();
      });
      this.statusBar.styleDefault();
    });
  }
}


