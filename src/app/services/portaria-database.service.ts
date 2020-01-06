import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Portaria {
  id?: string,
  name: string,
  notes: string
}



@Injectable({
  providedIn: 'root'
})
export class PortariaDatabaseService {

  private portarias: Observable<Portaria[]>;
  private portariaCollection: AngularFirestoreCollection<Portaria>;
 
  constructor(private afs: AngularFirestore) {
    this.portariaCollection = this.afs.collection<Portaria>('portaria');
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
    return this.portariaCollection.add(portaria);
  }
 
  updatePortaria(portaria: Portaria): Promise<void> {
    return this.portariaCollection.doc(portaria.id).update({ name: portaria.name, notes: portaria.notes });
  }
 
  deletePortaria(id: string): Promise<void> {
    return this.portariaCollection.doc(id).delete();
  }
}