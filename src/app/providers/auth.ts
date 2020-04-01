import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth) {}


  register = (data) => this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.senha);

  login = (data) => this.afAuth.auth.signInWithEmailAndPassword(data.email, data.senha);

  resetPassword = (email: string) => this.afAuth.auth.sendPasswordResetEmail(email);

  logout = () =>  this.afAuth.auth.signOut();

}


