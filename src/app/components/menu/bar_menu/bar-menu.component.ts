import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'bar-menu',
  templateUrl: './bar-menu.component.html',
})
export class BarMenuComponent implements OnInit {
  public items: MenuItem[] | undefined;

  constructor(
    private _router: Router
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
    this._router.navigate(['login']);
  }
}

