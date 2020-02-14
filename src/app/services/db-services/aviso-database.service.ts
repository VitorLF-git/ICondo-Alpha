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
  condominio: string,
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
    
    
  }

  getAvisos(condominio: string): Observable<Aviso[]> {
    this.getAvisosByCondominio(condominio);

    return this.avisos;
  }

  getAviso(id: string, condominio): Observable<Aviso> {
    this.getAvisosByCondominio(condominio);

    return this.avisoCollection.doc<Aviso>(id).valueChanges().pipe(
      take(1),
      map(aviso => {
        aviso.id = id;
        return aviso
      })
    );
  }

  addAviso(aviso: Aviso, condominio): Promise<DocumentReference> {
    this.getAvisosByCondominio(condominio);
    aviso.date = firebase.firestore.FieldValue.serverTimestamp();
    return this.avisoCollection.add(aviso);
  }

  updateAviso(aviso: Aviso, condominio): Promise<void> {
    this.getAvisosByCondominio(condominio);

    return this.avisoCollection.doc(aviso.id).update({ name: aviso.title, notes: aviso.content });
  }

  deleteAviso(id: string, condominio): Promise<void> {
    this.getAvisosByCondominio(condominio);

    return this.avisoCollection.doc(id).delete();
  }

  getAvisosByCondominio(condominio: string){

    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
    } else {
    }


    this.avisoCollection = this.afs.collection<Aviso>('aviso', ref => ref.where('condominio', '==', condominio).orderBy("date", "desc").limit(10));
    this.avisos = this.avisoCollection.snapshotChanges().pipe(
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