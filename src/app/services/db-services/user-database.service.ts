import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../authentication.service';
import * as firebase from 'firebase';


export interface User {
  id?: string,
  name: string,
  email: string,
  apt: string,
  garage: string,
  type: string,
  notes: string,
  date: any
}


@Injectable({
  providedIn: 'root'
})
export class UserDatabaseService {


  userEmail: string = "";
  private users: Observable<User[]>;
  private userCollection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore, private authService: AuthenticateService) {
    

  }

  getUsers(): Observable<User[]> {
    this.getUsersByEmail();
    return this.users;
  }

  getUsersByApt(apt: string) {
    
    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
      this.authService.userDetails().getIdToken;
    } else {
    }

    this.userCollection = this.afs.collection<User>('user', ref => ref.where('apt', '==', apt));
    this.users = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    console.log(this.users);
    

    return this.users;
  }

  getUsersByEmail() {

    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
      this.authService.userDetails().getIdToken;
    } else {
    }

    this.userCollection = this.afs.collection<User>('user', ref => ref.where('email', '==', this.userEmail));
    this.users = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getUser(id: string): Observable<User> {
    return this.userCollection.doc<User>(id).valueChanges().pipe(
      take(1),
      map(user => {
        user.id = id;
        return user
      })
    );
  }

  addUser(user: User): Promise<DocumentReference> {
    this.getUsersByEmail();
    user.date = firebase.firestore.FieldValue.serverTimestamp();
    return this.userCollection.add(user);
  }

  updateUser(user: User): Promise<void> {
    this.getUsersByEmail();

    return this.userCollection.doc(user.id).update({ name: user.name, notes: user.notes });
  }

  deleteUser(id: string): Promise<void> {
    this.getUsersByEmail();

    return this.userCollection.doc(id).delete();
  }
}