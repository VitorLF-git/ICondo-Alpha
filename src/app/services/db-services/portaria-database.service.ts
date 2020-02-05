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
  notes: string,
  custom: boolean,
  confirmed: string,
  confirmed2: string,
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
    console.log("make collection")
    this.portariaCollection = this.afs.collection<Portaria>('portaria', ref => ref.where('email', '==', this.userEmail).orderBy("date", "desc").limit(10));
    this.portarias = this.portariaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          console.log("new change")

          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getPortarias(): Observable<Portaria[]> {
    this.getPortariasByEmail();
    return this.portarias;
  }

  getLastPortarias(): Observable<Portaria[]> {
    this.getLastPortariaByEmail();
    return this.portarias;
  }

  getPortaria(id: string): Observable<Portaria> {
    this.getPortariasByEmail();

    return this.portariaCollection.doc<Portaria>(id).valueChanges().pipe(
      take(1),
      map(portaria => {
        portaria.id = id;
        return portaria
      })
    );
  }

  addPortaria(portaria: Portaria): Promise<DocumentReference> {
    this.getPortariasByEmail();

    portaria.date = firebase.firestore.FieldValue.serverTimestamp();
    return this.portariaCollection.add(portaria);
  }

  updatePortaria(portaria: Portaria): Promise<void> {
    this.getPortariasByNothing();

    return this.portariaCollection.doc(portaria.id).update({ confirmed: portaria.confirmed });
  }

  confirmPortariaMorador(id: string, message: string): Promise<void> {
    this.getPortariasByNothing();

    return this.portariaCollection.doc(id).update({ confirmed: message });
  }

  confirmPortariaPorteiro(id: string, message: string): Promise<void> {
    this.getPortariasByNothing();

    return this.portariaCollection.doc(id).update({ confirmed2: message });
  }

  deletePortaria(id: string): Promise<void> {
    this.getPortariasByEmail();

    return this.portariaCollection.doc(id).delete();
  }

  getLastPortariaByEmail() {
    console.log("make one")
    this.portariaCollection = this.afs.collection<Portaria>('portaria', ref => ref.orderBy("date", "desc").limit(1));
    this.portarias = this.portariaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          console.log("new change")

          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getPortariasByEmail() {

    console.log("make collection")
    this.portariaCollection = this.afs.collection<Portaria>('portaria', ref => ref.where('email', '==', this.userEmail).orderBy("date", "desc").limit(10));
    this.portarias = this.portariaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          console.log("new change")

          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getPortariasByNothing() {

    console.log("make collection")
    this.portariaCollection = this.afs.collection<Portaria>('portaria');
    this.portarias = this.portariaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          console.log("new change")

          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}