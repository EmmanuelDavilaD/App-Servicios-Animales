import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot} from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Injectable()
export class ListResolver implements Resolve<any> {

  constructor(private firebaseService: FirebaseService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const category = route.paramMap.get('category');
    return this.firebaseService.getEmpresasFilterBy(category);
  }
}
