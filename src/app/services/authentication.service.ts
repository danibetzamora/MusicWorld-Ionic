import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { Alert } from 'selenium-webdriver';
import { Firestore, addDoc, collection, docSnapshots, doc, where, limit, collectionSnapshots, query, updateDoc } from "@angular/fire/firestore";

@Injectable({ providedIn: 'root' })
export class AuthenticateService{

  constructor(private afAuth: AngularFireAuth, private firestore: Firestore) { }

  registerUser(value, success = (arg) => {}, error = (arg) => {}) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password).then(
        (res) => {
          this.authDetails().subscribe(
            (item) => {
              addDoc( collection(this.firestore, `users`), {
                name: value.name,
                surname: value.surname,
                auth_id: item.uid,
              }).then(success);
            }
          )
        }, error)
    });
  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => {
            reject(err);
            console.log(err);
            alert(err);



          })
    })
  }

  userDetails(id) {
    let q = query(
      collection(this.firestore, 'users'),
      where('auth_id', '==', id),
      limit(1)
    );
    return collectionSnapshots(q);
  }

  authDetails() {
    return this.afAuth.user;
  }

  logoutUser() {
    if (this.afAuth.currentUser) return this.afAuth.signOut();
  }

  updateUserDetails(id, name, surname){
    return updateDoc( doc(this.firestore, `users/${id}`), {
      name,
      surname,
    });
  }
}
