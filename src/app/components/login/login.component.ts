import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'tasks-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  public loginObj: Login = new Login();

  constructor(
    private _router: Router
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
    this._router.navigate(['main']);
  }
}


