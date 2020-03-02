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
  morning: boolean,
  afternoon: boolean,
  night: boolean,
  allDay: boolean,
  condominio: string,
  creationDate: any,
  apt: string,
}



@Injectable({
  providedIn: 'root'
})
export class CalendarioDatabaseService {

  currentDate: any;
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
    this.getCalendariosByCondominioAndDate(condominio, calendario.startTime);
    console.log("calendario database add");
    console.log(this.calendarios);
    calendario.creationDate = firebase.firestore.FieldValue.serverTimestamp();
    return this.calendarioCollection.add(calendario);
  }

  getCalendarioByApt(apt: string, condo: string) {
    this.currentDate = new Date().toISOString();
    

    this.calendarioCollection = this.afs.collection<EventCalendario>('calendario', ref => ref.where('apt', '==', apt).where('condominio', '==', condo).where('startTime', '>', this.currentDate).orderBy("startTime", "desc"));
    this.calendarios = this.calendarioCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    

    return this.calendarios;
  }


  updateCalendario(calendario: EventCalendario, condominio): Promise<void> {
    this.getCalendariosByCondominio(condominio);

    return this.calendarioCollection.doc(calendario.id).update({ name: calendario.title, notes: calendario.desc });
  }

  deleteCalendario(id: string): Promise<void> {
    return this.calendarioCollection.doc(id).delete();
  }

  getCalendariosByCondominio(condominio: string) {

    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
    } else {
    }
    this.currentDate = new Date().toISOString();
    console.log("current date");
    console.log(this.currentDate);

    this.calendarioCollection = this.afs.collection<EventCalendario>('calendario', ref => ref.where('condominio', '==', condominio).where('endTime', '>', this.currentDate));
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

  
  getCalendariosByCondominioAndDate(condominio: string, date: string) {

    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
    } else {
    }
    this.currentDate = new Date().toISOString();
    console.log("current date");
    console.log(this.currentDate);

    this.calendarioCollection = this.afs.collection<EventCalendario>('calendario', ref => ref.where('condominio', '==', condominio).where('endTime', '>', this.currentDate).where('startTime', '==', date));
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
