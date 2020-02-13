import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../authentication.service';
import * as firebase from 'firebase';


export interface Condominio {
  id?: string,
  name: string,
  code: string,
}


@Injectable({
  providedIn: 'root'
})
export class CondominioDatabaseService {


  condominioEmail: string = "";
  private condominios: Observable<Condominio[]>;
  private condominioCollection: AngularFirestoreCollection<Condominio>;

  constructor(private afs: AngularFirestore, private authService: AuthenticateService) {
    

  }

  getCondominiosByCode(code): Observable<Condominio[]> {
    this.getCondominiosFromDbByCode(code);
    return this.condominios;
  }

  getAllCondominios(): Observable<Condominio[]> {
    this.getCondominiosByNothing();
    return this.condominios;
  }

  private getCondominiosFromDbByCode(code) {

    this.condominioCollection = this.afs.collection<Condominio>('condominio', ref => ref.where('code', '==', code));
    this.condominios = this.condominioCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getCondominiosByNothing() {

    if (this.authService.userDetails()) {
      this.condominioEmail = this.authService.userDetails().email;
      this.authService.userDetails().getIdToken;
    } else {
    }

    this.condominioCollection = this.afs.collection<Condominio>('condominio');
    this.condominios = this.condominioCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getCondominio(id: string): Observable<Condominio> {
    return this.condominioCollection.doc<Condominio>(id).valueChanges().pipe(
      take(1),
      map(condominio => {
        condominio.id = id;
        return condominio
      })
    );
  }

  deleteCondominio(id: string): Promise<void> {
    this.getCondominiosByNothing();

    return this.condominioCollection.doc(id).delete();
  }
}