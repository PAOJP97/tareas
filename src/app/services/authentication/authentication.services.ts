import { CollectionReference, DocumentReference, Firestore, Query, QueryDocumentSnapshot, addDoc, collection, collectionData, collectionSnapshots, doc, docData, documentId, getDoc, getDocs, getDocsFromServer, query, setDoc } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { SignUp } from '../../models/signup.model';
import { AUTH_CODES } from '../constants';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationServices {

    constructor(
        
    ) {
        this.keepUpdateUser();
    }

    private _isAuthenticated: boolean = false;
    public currentUser: string | null = null;

    public currentUserChange = new Subject<string | null>();

    public setCurrentUserChangeSubject(newUser: string | null) {
        this.currentUserChange.next(newUser);
    }

    public getCurrentUserChangeHandler(): Observable<string | null> {
        return this.currentUserChange;
    }

    public keepUpdateUser() {
        setInterval(() => {
            this.setCurrentUserChangeSubject(this.currentUser);
        }, 5000);
    }

    public isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    public setAuthenticated(value: boolean) {
        this._isAuthenticated = value;
    }

    public saveUser(firestore: CollectionReference, user: any): Promise<any> {
        return new Promise((resolve, reject) => {
            getDoc(doc(firestore, user.username)).then((response) => {
                if (response.exists()) {
                    reject(AUTH_CODES.ALREADY_EXISTS_ERROR);
                } else {
                    const ref = doc(firestore, user.username);
                    setDoc(ref, {
                        username: user.username,
                        fullName: user.fullName,
                        password: user.password
                    }).then((response) => {
                        resolve(AUTH_CODES.OK);
                    })
                    .catch((error) => {
                        reject(AUTH_CODES.GENERAL_ERROR);
                    })
                }
            })
            .catch((error) => {
                reject(AUTH_CODES.GENERAL_ERROR);
            })
        })
    }

    public login(firestore: CollectionReference, user: any): Promise<any> {
        return new Promise((resolve, reject) => {
            getDoc(doc(firestore, user.username)).then((response) => {
                if (response.exists()) {
                    this.currentUser = response.get('username');
                    this.setCurrentUserChangeSubject(this.currentUser);
                    const password = response.get('password');
                    if (password === user.password) {
                        resolve(AUTH_CODES.OK);
                        this._isAuthenticated = true;
                    } else {
                        reject(AUTH_CODES.CREDENTIALS_ERROR);
                    }
                } else {
                    reject(AUTH_CODES.CREDENTIALS_ERROR);
                }
            })
            .catch((error) => {
                reject(AUTH_CODES.GENERAL_ERROR);
            })
        })
    }

    public logout() {
        this.currentUser = null;
        this.setCurrentUserChangeSubject(this.currentUser);
        this._isAuthenticated = false;
    }
}