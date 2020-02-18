import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenticateService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';
import { firestore } from 'firebase';
import * as firebase from 'firebase';

export interface EventCalendario {
  id?: string,
  title: string,
  desc: string,
  startTime: string,
  endTime: string,
  allDay: false
  condominio: string,
  creationDate: any,
}



@Injectable({
  providedIn: 'root'
})
export class CalendarioDatabaseService {


  userEmail: string;
  private calendarios: Observable<EventCalendario[]>;
  private calendarioCollection: AngularFirestoreCollection<EventCalendario>;


  constructor(private afs: AngularFirestore, private authService: AuthenticateService) {


  }

  getCalendarios(condominio: string): Observable<EventCalendario[]> {
    this.getCalendariosByCondominio(condominio);

    return this.calendarios;
  }

  getCalendario(id: string, condominio): Observable<EventCalendario> {
    this.getCalendariosByCondominio(condominio);

    return this.calendarioCollection.doc<EventCalendario>(id).valueChanges().pipe(
      take(1),
      map(calendario => {
        calendario.id = id;
        return calendario
      })
    );
  }

  addCalendario(calendario: EventCalendario, condominio): Promise<DocumentReference> {
    this.getCalendariosByCondominio(condominio);
    calendario.creationDate = firebase.firestore.FieldValue.serverTimestamp();
    return this.calendarioCollection.add(calendario);
  }

  updateCalendario(calendario: EventCalendario, condominio): Promise<void> {
    this.getCalendariosByCondominio(condominio);

    return this.calendarioCollection.doc(calendario.id).update({ name: calendario.title, notes: calendario.desc });
  }

  deleteCalendario(id: string, condominio): Promise<void> {
    this.getCalendariosByCondominio(condominio);

    return this.calendarioCollection.doc(id).delete();
  }

  getCalendariosByCondominio(condominio: string) {

    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
    } else {
    }


    this.calendarioCollection = this.afs.collection<EventCalendario>('calendario', ref => ref.where('condominio', '==', condominio).orderBy("creationDate", "desc").limit(10));
    this.calendarios = this.calendarioCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );


  }
}
