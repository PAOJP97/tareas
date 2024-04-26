import { CollectionReference, DocumentReference, Firestore, Query, QueryDocumentSnapshot, addDoc, collection, collectionData, collectionSnapshots, doc, docData, documentId, getDoc, getDocs, getDocsFromServer, query, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SignUp } from '../../models/signup.model';
import { DB_User } from '../../db_models/db_user.model';
import { AUTH_CODES } from '../constants';

export class AuthenticationServices {

    saveUser(firestore: CollectionReference, user: any): Promise<any> {
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
                        console.log(error);
                        reject(AUTH_CODES.GENERAL_ERROR);
                    })
                }
            })
            .catch((error) => {
                reject(AUTH_CODES.GENERAL_ERROR);
            })
        })
    }
}