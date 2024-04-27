import { Component, OnInit } from '@angular/core';
import { Title } from 'chart.js';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TaskServices } from '../../../services/tasks/task.services';
import { Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { DatePipe } from '@angular/common';
import { LoadingServices } from '../../../services/loading/loading.services';

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
  public taskCount: number = 0;

  public filteredTasks: Array<any> = [];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _firestore: Firestore,
    private _taskService: TaskServices,
    private _datePipe: DatePipe,
    private _loadingService: LoadingServices
  ) { }

  showDeleteDialog(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Está seguro que desea eliminar la tarea?',
      header: 'Confirmar',
      acceptIcon: "pi pi-check",
      rejectIcon: "pi pi-times",
      acceptButtonStyleClass: 'p-ripple p-element p-button p-component p-button-icon-only p-button-raised p-button-rounded p-button-text',
      accept: () => {
        this._loadingService.setLoadingSubject(true);
        const refTasks = collection(this._firestore, 'tareas');
        this._taskService.deleteTask(refTasks, this.selectedItem).then(() => {
          this._updateTasks();
        })
        .catch(() => {
          console.log('HA OCURRIDO UN ERROR');
        })
        .finally(() => {
          this._loadingService.setLoadingSubject(false);
        })
        //this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Ha eliminado la tarea' });
      },
      reject: () => {
      }
    });
  }

  ngOnInit(): void {
    this._updateTasks();
  }

  private _updateTasks() {
    this._loadingService.setLoadingSubject(true);
    const refCountTasks = collection(this._firestore, 'control');
    this._taskService.taskCount(refCountTasks).then((response) => {
      this.taskCount = response;
      const refTasks = collection(this._firestore, 'tareas');
      this._taskService.getTasks(refTasks).then((response) => {
        const items: Array<any> = [];
        response.forEach((item: any) => {
          items.push(item);
        })
        items.push({
          addNew: true
        })
        this.tasks = items;
        this.filteredTasks = this.tasks;
      })
        .catch(() => {
          console.log('HA OCURRIDO UN ERROR');
        })
        .finally(() => {
          this._loadingService.setLoadingSubject(false);
        })
    })
    .catch(() => {
      this.taskCount = 0;
    })
    .finally(() => {
      this._loadingService.setLoadingSubject(false);
    })
  }

  public applyFilters() {
    if (!this.searchDueDate && (!this.searchInput || this.searchInput?.length === 0)) {
      this.filteredTasks = this.tasks;
    } else {
      const totalTasks = this.tasks.slice();
      let auxiliarFilter: Array<any> = [];
      if (this.searchInput &&this.searchInput.length > 0) {
        const filterText = this.searchInput;
        auxiliarFilter = totalTasks.filter((task) => task.title?.toLowerCase().includes(filterText.toLowerCase()) || task.description?.toLowerCase().includes(filterText.toLowerCase()));
      } else {
        auxiliarFilter = this.tasks;
      }
      if (this.searchDueDate) {
        auxiliarFilter = auxiliarFilter.filter((task) => this._formatDateToCompare(task.dueDate) === this._formatDateToCompare(this.searchDueDate))
      }
      this.filteredTasks = auxiliarFilter;
    }
  }

  private _formatDateToCompare(date: Date): string {
    return this._datePipe.transform(date, 'yyyyMMdd') || '';
  }

  public displayForm($event: any) {
    this.showForm = true;
    this.selectedItem = $event;
  }

  public closeForm($event: any) {
    this.showForm = false;
    this.selectedItem = null;
    if ($event) {
      this._updateTasks();
    }
  }

  public displayDeleteConfirmation($event: any) {
    const originalEvent = $event.event;
    this.selectedItem = $event.item;
    this.showDeleteDialog(originalEvent);
  }

  public resetFilters() {
    this.searchInput = null;
    this.searchDueDate = null;
    this.filteredTasks = this.tasks;
  }
}

