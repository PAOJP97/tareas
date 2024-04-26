import { Component, OnInit } from '@angular/core';
import { Title } from 'chart.js';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'tareas',
  templateUrl: './tareas.component.html',
})
export class TareasComponent implements OnInit {
  public showForm: boolean = false;
  public selectedItem: any = null;

  public searchInput: any = null;
  public searchDueDate: any = null;

  public tasks: Array<any> = [];

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

  showDeleteDialog(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: '¿Está seguro que desea eliminar la tarea?',
        header: 'Confirmar',
        acceptIcon:"pi pi-check",
        rejectIcon:"pi pi-times",
        acceptButtonStyleClass: 'p-ripple p-element p-button p-component p-button-icon-only p-button-raised p-button-rounded p-button-text',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Ha eliminado la tarea' });
        },
        reject: () => {
        }
    });
}

  ngOnInit(): void {
    this.simulateTasksRetrieve().then((response) => {
      const items: Array<any> = [];
      response.forEach((item: any) => {
        items.push(item);
      })
      items.push({
        addNew: true
      })
      this.tasks = items;
    })
    .catch((error) => {
      console.log(error);
    })
  }

  public displayForm($event: any) {
    this.showForm = true;
    this.selectedItem = $event;
  }

  public closeForm($event: any) {
    this.showForm = false;
    this.selectedItem = null;
  }

  public displayDeleteConfirmation($event: any) {
    this.showDeleteDialog($event)

  }

  simulateTasksRetrieve(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(
        [
          {
            title: 'PRIMER TAREA',
            description: 'Hacer la comida para mañana, no olvidarse',
            dueDate: new Date(),
            state: 'Completada'
          }
        ]
      ),
      reject('ERROR');
    })
  }
}

