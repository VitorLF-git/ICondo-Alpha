import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenticateService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';
import { firestore } from 'firebase';
import * as firebase from 'firebase';


export interface Chamado {
  id?: string,
  date: any,
  title: string,
  content: string,
  condominio: string,
  category: string,
  tokens?: string[],
}


@Injectable({
  providedIn: 'root'
})
export class ChamadoDatabaseService {


  userEmail: string;
  private chamados: Observable<Chamado[]>;
  private chamadoCollection: AngularFirestoreCollection<Chamado>;


  constructor(private afs: AngularFirestore, private authService: AuthenticateService) {
    
    
  }

  getChamados(condominio: string): Observable<Chamado[]> {
    this.getChamadosByCondominio(condominio);

    return this.chamados;
  }

  getChamado(id: string, condominio): Observable<Chamado> {
    this.getChamadosByCondominio(condominio);

    return this.chamadoCollection.doc<Chamado>(id).valueChanges().pipe(
      take(1),
      map(chamado => {
        chamado.id = id;
        return chamado
      })
    );
  }

  addChamado(chamado: Chamado, condominio): Promise<DocumentReference> {
    this.getChamadosByCondominio(condominio);
    chamado.date = firebase.firestore.FieldValue.serverTimestamp();
    return this.chamadoCollection.add(chamado);
  }

  updateChamado(chamado: Chamado, condominio): Promise<void> {
    this.getChamadosByCondominio(condominio);

    return this.chamadoCollection.doc(chamado.id).update({ name: chamado.title, notes: chamado.content });
  }

  deleteChamado(id: string, condominio): Promise<void> {
    this.getChamadosByCondominio(condominio);

    return this.chamadoCollection.doc(id).delete();
  }

  getChamadosByCondominio(condominio: string){

    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
    } else {
    }


    this.chamadoCollection = this.afs.collection<Chamado>('chamado', ref => ref.where('condominio', '==', condominio).orderBy("date", "desc").limit(10));
    this.chamados = this.chamadoCollection.snapshotChanges().pipe(
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