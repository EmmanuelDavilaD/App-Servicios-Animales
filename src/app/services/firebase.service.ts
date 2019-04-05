import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { rejects } from 'assert';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private snapshotChangesSubscription: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
  }

  getEmpresas() {
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this.afs.collection('empresas').snapshotChanges();
      resolve(this.snapshotChangesSubscription);
    });
  }

  getEmpresasFilterBy(especialidad) {
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this.afs.collection('empresas', ref => ref.where('especialidad', '==', especialidad))
        .snapshotChanges();
      resolve(this.snapshotChangesSubscription);
    });
  }



  getEmpresa(empresaId) {
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this.afs.doc<any>('/empresas/' + empresaId).valueChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        }, err => {
          reject(err);
        });
    });
  }

  unsubscribeOnLogOut() {
    //remember to unsubscribe from the snapshotChanges
    this.snapshotChangesSubscription.unsubscribe();
  }

  updateEmpresa(empresaKey, value) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('empresas').doc(empresaKey).set(value)
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }



  deleteEmpresa(empresaKey) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('empresas').doc(empresaKey).delete()
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  getPatrocinadores() {
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this.afs.collection('patrocinadores').snapshotChanges();
      resolve(this.snapshotChangesSubscription);
    });
  }

  getPatrocinador(patrocinadorId) {
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this.afs.doc<any>('/patrocinadores/' + patrocinadorId).valueChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        }, err => {
          reject(err);
        });
    });
  }

  createPatrocinador(value){
    return new Promise<any>((resolve, reject) =>{
      this.afs.collection('patrocinadores').add({
        image: value.image,
        url: value.url
      })
      .then(
        res => resolve(res),
        err => reject(err)
      );
    })
  }

  deletePatrocinador(patrocinadoresKey) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('patrocinadores').doc(patrocinadoresKey).delete()
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  createEmpresa(value) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('empresas').add({
        title: value.title,
        descripcion: value.descripcion,
        ubicacion: value.ubicacion,
        direccion: value.direccion,
        telefono: value.telefono,
        colegiado: value.colegiado,
        campañas: value.campañas,
        horario: value.horario,
        cif: value.cif,
        codPostal: value.codPostal,
        especialidad: value.especialidad,
        especialidades: value.especialidades,
        animales: value.animales,
        email: value.email,
        plan: value.plan,
        image: value.image
      })
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext('2d');
    var img = new Image();
    img.onload = function () {
      var aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL('image/jpeg');
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI, randomId) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(randomId);
      this.encodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            snapshot.ref.getDownloadURL()
              .then(res => resolve(res));
          }, err => {
            reject(err);
          });
      });
    });
  }
}
