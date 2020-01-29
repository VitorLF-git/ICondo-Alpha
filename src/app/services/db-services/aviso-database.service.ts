import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenticateService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';
import { firestore } from 'firebase';
import * as firebase from 'firebase';


export interface Aviso {
  id?: string,
  date: any,
  title: string,
  content: string,
  category: string,
}


@Injectable({
  providedIn: 'root'
})
export class AvisoDatabaseService {
 

  userEmail: string;
  private avisos: Observable<Aviso[]>;
  private avisoCollection: AngularFirestoreCollection<Aviso>;


  constructor(private afs: AngularFirestore, private authService: AuthenticateService) {
    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
      this.authService.userDetails().getIdToken;
    } else {
    }


    this.avisoCollection = this.afs.collection<Aviso>('aviso', ref => ref.orderBy("date", "desc").limit(10));
    this.avisos = this.avisoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        });
      })
    );
  }

  getAvisos(): Observable<Aviso[]> {

    return this.avisos;
  }

  getAviso(id: string): Observable<Aviso> {
    return this.avisoCollection.doc<Aviso>(id).valueChanges().pipe(
      take(1),
      map(aviso => {
        aviso.id = id;
        return aviso
      })
    );
  }

  addAviso(aviso: Aviso): Promise<DocumentReference> {
    aviso.date = firebase.firestore.FieldValue.serverTimestamp();
    return this.avisoCollection.add(aviso);
  }

  updateAviso(aviso: Aviso): Promise<void> {
    return this.avisoCollection.doc(aviso.id).update({ name: aviso.title, notes: aviso.content });
  }

  deleteAviso(id: string): Promise<void> {
    return this.avisoCollection.doc(id).delete();
  }


}