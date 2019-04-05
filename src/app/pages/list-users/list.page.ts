import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';

declare var google;

@Component({
  selector: 'list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  mapReady = false;
  mapRef = null;

  items: Array<any>;

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };
  searchText: string = '';
  searchEspecialidades: string = '';
  searchAnimales: string = '';
  
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  address:string;

  constructor(
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
  ) { }

  ngOnInit() {
    this.loadMap();
    if (this.route && this.route.data) {
      this.getData();
    }
  }

  async getData() {
    const loading = await this.loadingCtrl.create({
      message: 'Espere un momento...',
      duration: 2000
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


  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
      this.map.addListener('tilesloaded', () => {
        console.log('accuracy',this.map);
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });
 
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
 
  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords "+lattitude+" "+longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
 
    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if(value.length>0)
          responseAddress.push(value);
 
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value+", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) =>{ 
        this.address = "Address Not Available!";
      });
 
  }
 

  // filtro(searchText: string, ubicacion: string) {
  //   console.log('pasa por aqui', searchText, ubicacion);
  //   if (ubicacion && searchText && ubicacion.toLowerCase().contains(searchText.toLowerCase())) {
  //     console.log('tiene');
  //     //return ubicacion;
  //   }
  //   console.log('NO tiene');
  //   //return '';
  // }
}
