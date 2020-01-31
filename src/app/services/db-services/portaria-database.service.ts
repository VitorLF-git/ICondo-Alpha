import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../authentication.service';
import { environment } from 'src/environments/environment';
import { firestore } from 'firebase';
import * as firebase from 'firebase';

export interface Portaria {
  id?: string,
  apt: string,
  content: string,
  email: string,
  date: any
}



@Injectable({
  providedIn: 'root'
})
export class PortariaDatabaseService {


  userEmail: string;
  private portarias: Observable<Portaria[]>;
  private portariaCollection: AngularFirestoreCollection<Portaria>;

  constructor(private afs: AngularFirestore, private authService: AuthenticateService) {
    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
    } else {
    }
    this.portariaCollection = this.afs.collection<Portaria>('portaria', ref => ref.where('email', '==', this.userEmail).orderBy("date", "desc").limit(10));
    this.portarias = this.portariaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getPortarias(): Observable<Portaria[]> {
    return this.portarias;
  }

  getPortaria(id: string): Observable<Portaria> {
    return this.portariaCollection.doc<Portaria>(id).valueChanges().pipe(
      take(1),
      map(portaria => {
        portaria.id = id;
        return portaria
      })
    );
  }

  addPortaria(portaria: Portaria): Promise<DocumentReference> {
    portaria.date = firebase.firestore.FieldValue.serverTimestamp();
    return this.portariaCollection.add(portaria);
  }

  updatePortaria(portaria: Portaria): Promise<void> {
    return this.portariaCollection.doc(portaria.id).update({ name: portaria.apt, notes: portaria.content });
  }

  deletePortaria(id: string): Promise<void> {
    return this.portariaCollection.doc(id).delete();
  }
}