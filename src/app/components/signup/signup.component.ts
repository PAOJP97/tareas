import { Component } from '@angular/core';
import { SignUp } from '../../models/signup.model';
import { Router } from '@angular/router';
import { Firestore, collection, getFirestore } from '@angular/fire/firestore';
import { AuthenticationServices } from '../../services/authentication/authentication.services';
import { AUTH_CODES } from '../../services/constants';

@Component({
  selector: 'tasks-signup',
  templateUrl: './signup.component.html'
})
export class SignUpComponent {
  public signUpObj: SignUp = new SignUp();
  public fullNameRegexp: RegExp = /^[A-Za-z0-9 ]*$/

  constructor(
    private _router: Router,
    private _firestore: Firestore,
    private _authServices: AuthenticationServices
  ) {

  }

  ngOnInit(): void {
    
  }


  validateForm(): boolean {
    const isUsernameValid = (this.signUpObj.username?.length >= 6);
    const isPasswordValid = (this.signUpObj.password?.length >= 6);
    const isPasswordConfirmValid = (this.signUpObj.passwordConfirm?.length >= 6);
    const isFullNameValid = (this.signUpObj.fullName?.length >= 6);
    const doPasswordsMatch = (this.signUpObj.password === this.signUpObj.passwordConfirm);
    return isUsernameValid && isPasswordValid && isPasswordConfirmValid && isFullNameValid && doPasswordsMatch;
  }

  navigateToLogin($event?: any) {
    this._router.navigate(['login']);
  }

  signup($event: any) {
    const signupRef = collection(this ._firestore, 'usuarios');
    this._authServices.saveUser(signupRef, this.signUpObj).then((response) => {
      this.navigateToLogin();
    })
    .catch((error) => {
      switch (error) {
        case AUTH_CODES.ALREADY_EXISTS_ERROR:
          console.log('EL USUARIO YA EXISTE');
        break;
        case AUTH_CODES.GENERAL_ERROR:
        default:
          console.log('HA OCURRIDO UN ERROR');
        break;
      }
    })
  }

}

