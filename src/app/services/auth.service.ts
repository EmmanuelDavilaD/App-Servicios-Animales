import { MenuPage } from './../pages/menu/menu.page';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {UserInterface} from '../pages/models/user';
import { map } from 'rxjs/operators';
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firebaseService: FirebaseService,
    public afAuth: AngularFireAuth,
    private afsAuth: AngularFireAuth, 
    private afs: AngularFirestore
  ){}

  doRegister(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }

  doRegisterUser(value) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
        .then(userData => {
          resolve(userData),
            this.updateUserData(userData.user)
        }).catch(err => console.log(reject(err)))
    });
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      roles: {
        empresas: true
      }
    }
    return userRef.set(data, { merge: true })
  }
  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  isUserAdmin(userUid) {
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }
  isUserEmpresa(userUid) {
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }

  doLogin(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signOut()
      .then(() => {
        this.firebaseService.unsubscribeOnLogOut();
        resolve();
      }).catch((error) => {
        console.log(error);
        reject();
      });
    })
  }
}
