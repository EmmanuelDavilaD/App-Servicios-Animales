import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  items: Array<any>;

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };

  constructor(
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.route && this.route.data) {
      this.getData();
    }
  }

  async getData() {
    const loading = await this.loadingCtrl.create({
      message: 'Espere un momento...'
    });
    this.presentLoading(loading);

    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        loading.dismiss();
        this.items = data;
      });
    });
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  logout() {
    this.authService.doLogout()
    .then(res => {
      this.router.navigate(['/login']);
    }, err => {
      console.log(err);
    });
  }

}
