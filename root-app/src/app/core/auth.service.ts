import { Injectable } from '@angular/core';
import { Router,  } from "@angular/router";

import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, startWith, tap, filter } from 'rxjs/operators';
import { auth } from 'firebase';

interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    }
    
    googleLogin() {
      const provider = new auth.GoogleAuthProvider();
      return this.oAuthLogin(provider);
    }

    private oAuthLogin(provider: any) {
      return this.afAuth.auth
        .signInWithPopup(provider)
        .then(credential => {
          return this.updateUserData(credential.user);
        })
        .catch(error => this.handleError(error));
    }

    emailLogin(email: string, password: string) {
      return this.afAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(credential => {
          return this.updateUserData(credential.user);
        })
    }

    signOut() {
      this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
      });
    }

    private handleError(error: Error) {
      console.error(error);
    }

    private updateUserData(user: User) {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(
        `users/${user.uid}`
      );
  
      const data: User = {
        uid: user.uid,
        email: user.email || null,
        displayName: user.displayName || 'nameless user',
        photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
      };
      return userRef.set(data);
    }

    anonymousLogin() {
      return this.afAuth.auth
        .signInAnonymously()
        .then(credential => {
          return this.updateUserData(credential.user);
        })
        .catch(error => {
          this.handleError(error);
        });
    }

    emailSignUp(email: string, password: string) {
      return this.afAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(credential => {
          return this.updateUserData(credential.user); // if using firestore
        })
    }

    checkEmailNotTaken(email: string) {
      return this.afs.collection('users').valueChanges().pipe(
        switchMap((users: [User])=> {
          const emailIsTaken = users.find(user => user.email === email);
          return of(!!emailIsTaken);
        })
      )
    }
}
