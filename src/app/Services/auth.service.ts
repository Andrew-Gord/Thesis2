import { Injectable } from '@angular/core';

import firebase from 'firebase/compat/app';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { getAuth, onAuthStateChanged } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public ngFireAuth:AngularFireAuth) {   }
  userID:string;

  async registerUser(email:string, password:string){
    return await this.ngFireAuth.createUserWithEmailAndPassword(email,password);
  }

  async loginUser(email:string,password:string){
    var login = await this.ngFireAuth.signInWithEmailAndPassword(email,password);
    const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      this.userID = user.uid;
      // ...
    }
    })
    return login;
  }
  async resetPasswor(email:string){
    return await this.ngFireAuth.sendPasswordResetEmail(email);
  }

  async signout(){
    const logout =  await this.ngFireAuth.signOut();
    this.userID = null;
    return logout;
  }




}
