import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../services/patrocinador.service';

@Component({
  selector: 'app-patrocinadores',
  templateUrl: './patrocinadores.component.html',
  styleUrls: ['./patrocinadores.component.scss']
})
export class PatrocinadoresComponent implements OnInit {

  patrocinadores: any;

  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit() {
    this.getPatrocinadores();
  }

  getPatrocinadores() {
    this.firebaseService.getPatrocinadores().then(patros => {
      patros.subscribe(results => {
        this.patrocinadores = results;
        console.log('patrocinadores', this.patrocinadores[0].payload.doc.data());
      });
    });
  }

}
