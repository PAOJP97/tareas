import { CollectionReference, deleteDoc, doc, getDocs, setDoc } from '@angular/fire/firestore';
import { TASK_CODES } from '../constants';
import { getDoc } from 'firebase/firestore';
import { AuthenticationServices } from '../authentication/authentication.services';
import { Injectable } from '@angular/core';

@Injectable()
export class TaskServices {
    public currentUser: string | null = null;

    constructor(
        private _authService: AuthenticationServices
    ) {
        this._authService.getCurrentUserChangeHandler().subscribe((newUser) => {
            this.currentUser = newUser;
        })
    }

    saveTask(firestore: CollectionReference, task: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const ref = doc(firestore, `${this.currentUser}_${task.id}`);
            setDoc(ref, {
                id: task.id,
                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
                status: task.status,
                owner: this.currentUser
            }).then(() => {
                resolve(TASK_CODES.OK);
            })
            .catch((error) => {
                reject(TASK_CODES.GENERAL_ERROR);
            })
        })
    }
    
    editTask(firestore: CollectionReference, task: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const ref = doc(firestore, `${this.currentUser}_${task.id}`);
            setDoc(ref, {
                id: task.id,
                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
                status: task.status,
                owner: this.currentUser
            }).then(() => {
                resolve(TASK_CODES.OK);
            })
            .catch((error) => {
                reject(TASK_CODES.GENERAL_ERROR);
            })
        })
    }

    
    deleteTask(firestore: CollectionReference, task: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const ref = doc(firestore, `${this.currentUser}_${task.id}`);
            deleteDoc(ref).then(() => {
                resolve(TASK_CODES.OK);
            })
            .catch((error) => {
                reject(TASK_CODES.GENERAL_ERROR);
            })
        })
    }


    getTasks(firestore: CollectionReference): Promise<any> {
        return new Promise((resolve, reject) => {
            getDocs(firestore).then((response) => {
                const items: Array<any> = [];
                response.docs.forEach((doc) => {
                    if (doc.id.includes(this.currentUser || '...')) {
                        items.push(
                            {
                                id: doc.get('id'),
                                title: doc.get('title'),
                                description: doc.get('description'),
                                dueDate: new Date(doc.get('dueDate')),
                                status: doc.get('status')
                            }
                        )
                    }
                });
                resolve(items);
            })
            .catch((error) => {
                reject(TASK_CODES.GENERAL_ERROR);
            })    
        })
    }

    // OBTENER EL CONTADOR ACTUAL
    taskCount(firestore: CollectionReference): Promise<any> {
        return new Promise((resolve, reject) => {
            const ref = doc(firestore, this.currentUser+'taskCounter');
            getDoc(ref).then((response) => {
                if (response.id.includes(this.currentUser || '...')) {
                    resolve(Number(response.get('count')));
                } else {
                    resolve(0);
                }
            })
            .catch((error) => {
                reject(TASK_CODES.GENERAL_ERROR);
            })
        })
    }

    // ACTUALIZAR EL CONTADOR
    setTaskCount(firestore: CollectionReference, count: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const ref = doc(firestore, this.currentUser+'taskCounter');
            setDoc(ref, {
                count: count,
                owner: this.currentUser
            }).then((response) => {
                resolve(TASK_CODES.OK);
            })
            .catch((error) => {
                reject(TASK_CODES.GENERAL_ERROR);
            })
        })
    }
}