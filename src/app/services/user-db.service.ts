import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/** Copy from https://devdactic.com/ionic-4-firebase-angularfire/ */
/** We need to create a db with multiple spaces (email, name, surname, etc just not the password) */

export interface User {
  id?: string;
  name: string;
  email: string;
  type: string;
  parking: string;
  apt: string;
  createdAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserDbService {
  
  private userCollection: AngularFirestoreCollection<User>;
 
  private users: Observable<User[]>;
 
  constructor(db: AngularFirestore) {
    this.userCollection = db.collection<User>('user');
 
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
 
  getUsers() {
    return this.users;
  }
 
  getUser(id) {
    return this.userCollection.doc<User>(id).valueChanges();
  }
 
  updateUser(user: User, id: string) {
    return this.userCollection.doc(id).update(user);
  }
 
  addUser(user: User) {
    return this.userCollection.add(user);
  }
 
  removeUser(id) {
    return this.userCollection.doc(id).delete();
  }
}
