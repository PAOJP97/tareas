import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Task } from '../../../../models/task.model';
import { DatePipe } from '@angular/common';
import { Firestore } from '@angular/fire/firestore';
import { TaskServices } from '../../../../services/tasks/task.services';
import { collection } from 'firebase/firestore';
import { LoadingServices } from '../../../../services/loading/loading.services';

@Component({
  selector: 'formulario',
  templateUrl: './formulario.component.html',
})
export class FormularioComponent implements OnInit, OnChanges {
  @Input() item: any = null;
  @Input() id: number = 0;

  @Output() onCloseForm: EventEmitter<any> = new EventEmitter();

  public today: Date = new Date();

  public completado: boolean = true;
  public tarea: Task = new Task();

  public isEdit: boolean = false;
  public enableChangeStatus: boolean = true;

  constructor(
    private _datePipe: DatePipe,
    private _firestore: Firestore,
    private _taskServices: TaskServices,
    private _loadingService: LoadingServices
  ) {

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    const newItem = changes['item']?.currentValue;
    if (newItem) {
      this.isEdit = true;
      this.tarea.id = newItem.id;
      this.tarea.title = newItem.title;
      this.tarea.description = newItem.description;
      this.tarea.dueDate = newItem.dueDate;
      this.tarea.status = newItem.status;
      this.completado = this.tarea.status === 'Completado';
      if (this.completado) {
        this.enableChangeStatus = false;
      } else {
        this.enableChangeStatus = true;
      }
    } else {
      this.tarea.id = this.id + 1;
      this.tarea.status = 'No completado';
      this.isEdit = false;
    }
  }

  validateForm(): boolean {
    const isTitleValid = this.tarea.title.length > 1;
    const isDescriptionValid = this.tarea.description.length > 1;
    const isDueDate = (this.tarea.dueDate || new Date()) >= new Date();
    return isTitleValid && isDescriptionValid && isDueDate;
  }

  formatDate(date: Date): string {
    return this._datePipe.transform(date, 'yyyy/MM/dd') || '-';
  }

  closeForm() {
    this.onCloseForm.emit(false);
  }

  executeAction() {
    this._loadingService.setLoadingSubject(true);
    if (this.isEdit) {
      const tasksRef = collection(this._firestore, 'tareas');
      this._taskServices.saveTask(tasksRef, {
        id: this.tarea.id,
        title: this.tarea.title,
        description: this.tarea.description,
        dueDate: this.tarea.dueDate?.toISOString(),
        status: this.tarea.status? 'Completado' : 'No completado'
      }).then(() => {
        this.onCloseForm.emit(true);
      })
      .catch(() => {
        console.log('HA OCURRIDO UN ERROR');
      })
      .finally(() => {
        this._loadingService.setLoadingSubject(false);
      })
    } else {
      const tasksRef = collection(this._firestore, 'tareas');
      this._taskServices.saveTask(tasksRef, {
        id: this.tarea.id,
        title: this.tarea.title,
        description: this.tarea.description,
        dueDate: this.tarea.dueDate?.toISOString(),
        status: this.tarea.status
      }).then(() => {
        const refCountTasks = collection(this._firestore, 'control');
        this._taskServices.setTaskCount(refCountTasks, this.id + 1).then(() => {
          this.onCloseForm.emit(true);
        })
        .catch(() => {
          console.log('HA OCURRIDO UN ERROR');
        })
        .finally(() => {
          this._loadingService.setLoadingSubject(false);
        })
      })
      .catch(() => {
        console.log('HA OCURRIDO UN ERROR');
      })
      .finally(() => {
        this._loadingService.setLoadingSubject(false);
      })
    }
  }
}

