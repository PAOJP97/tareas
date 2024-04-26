import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent implements OnInit {
  @Output() onMenuClick: EventEmitter<any> = new EventEmitter();

  public menus: any[] = [];

  ngOnInit(): void {
    this.menus = [
      {
        nombre: 'Panel', 
        icono: 'pi-desktop',
        route: 'panel'
      },
      {
        nombre: 'Tareas', 
        icono: 'pi-pen-to-square',
        route: 'tareas'
      }
    ]
  }

  notifyMenuClick(menu: any) {
    this.onMenuClick.emit(menu.route);
  }
}

