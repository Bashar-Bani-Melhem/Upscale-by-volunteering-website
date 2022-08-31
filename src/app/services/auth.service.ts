import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userState$=this.fireAuth.authState;
  constructor(private fireAuth:AngularFireAuth) { 

  }
  signIn(email:string,password:string){
    return from(this.fireAuth.signInWithEmailAndPassword(email,password));
  }
  signUp(email:string,password:string){
    return from(this.fireAuth.createUserWithEmailAndPassword(email,password));
  }
  signOut(){
    return from(this.fireAuth.signOut());
  }
}
