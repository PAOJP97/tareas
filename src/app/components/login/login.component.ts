import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/login.model';
import { Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { AuthenticationServices } from '../../services/authentication/authentication.services';
import { collection } from 'firebase/firestore';
import { AUTH_CODES } from '../../services/constants';

@Component({
  selector: 'tasks-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  public loginObj: Login = new Login();

  constructor(
    private _router: Router,
    private _firestore: Firestore,
    private _authServices: AuthenticationServices
  ) {

  }

  ngOnInit(): void {
    
  }

  validateForm(): boolean {
    const isUsernameValid = (this.loginObj.username?.length >= 6);
    const isPasswordValid = (this.loginObj.password?.length >= 6);
    return isUsernameValid && isPasswordValid;
  }

  navigateToSignUp($event: any): void {
    this._router.navigate(['signup']);
  }

  login($event: any): void {
    const loginRef = collection(this ._firestore, 'usuarios');
    this._authServices.login(loginRef, this.loginObj).then((response) => {
      this._router.navigate(['main']);
    })
    .catch((error) => {
      switch (error) {
        case AUTH_CODES.CREDENTIALS_ERROR:
          console.log('USUARIO O CONTRASEÑA INCORRECTOS');
        break;
        case AUTH_CODES.GENERAL_ERROR:
        default:
          console.log('HA OCURRIDO UN ERROR');
        break;
      }
    })
  }
}


