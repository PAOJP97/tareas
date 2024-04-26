import { CollectionReference, DocumentReference, Firestore, Query, QueryDocumentSnapshot, addDoc, collection, collectionData, collectionSnapshots, doc, docData, documentId, getDoc, getDocs, getDocsFromServer, query, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SignUp } from '../../models/signup.model';
import { DB_User } from '../../db_models/db_user.model';
import { AUTH_CODES } from '../constants';

export class AuthenticationServices {
    private _isAuthenticated: boolean = false;

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
        this._isAuthenticated = false;
    }
}