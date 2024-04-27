import { Observable, Subject } from "rxjs";

export class LoadingServices {

    public loadingSubject = new Subject<boolean>();

    public setLoadingSubject(value: boolean) {
        this.loadingSubject.next(value);
    }

    public loadingSubjectHandler(): Observable<boolean> {
        return this.loadingSubject;
    }
}