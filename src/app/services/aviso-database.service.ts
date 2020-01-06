import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Aviso {
  id?: string,
  name: string,
  notes: string
}


@Injectable({
  providedIn: 'root'
})
export class AvisoDatabaseService {


  private avisos: Observable<Aviso[]>;
  private avisoCollection: AngularFirestoreCollection<Aviso>;
 
  constructor(private afs: AngularFirestore) {
    this.avisoCollection = this.afs.collection<Aviso>('aviso');
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
    return this.avisoCollection.add(aviso);
  }
 
  updateAviso(aviso: Aviso): Promise<void> {
    return this.avisoCollection.doc(aviso.id).update({ name: aviso.name, notes: aviso.notes });
  }
 
  deleteAviso(id: string): Promise<void> {
    return this.avisoCollection.doc(id).delete();
  }
}