import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthenticationServices } from '../../../services/authentication/authentication.services';

@Component({
  selector: 'bar-menu',
  templateUrl: './bar-menu.component.html',
})
export class BarMenuComponent implements OnInit {
  public items: MenuItem[] | undefined;

  constructor(
    private _router: Router,
    private _authService: AuthenticationServices
  ) {

  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-power-off',
        command: () => {
            this._logOut();
        }
      }
    ]
  }

  private _logOut() {
    this._authService.logout();
    this._router.navigate(['login']);
  }
}

