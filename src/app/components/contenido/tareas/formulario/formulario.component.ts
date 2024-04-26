import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Task } from '../../../../models/task.model';

@Component({
  selector: 'formulario',
  templateUrl: './formulario.component.html',
})
export class FormularioComponent implements OnInit, OnChanges {
  @Input() item: any = null;

  @Output() onCloseForm: EventEmitter<any> = new EventEmitter();

  public completado: boolean = true;
  public tarea: Task = new Task();

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    const newItem = changes['item']?.currentValue;
    if (newItem) {
      this.tarea.title = newItem.title;
      this.tarea.description = newItem.description;
      this.tarea.dueDate = newItem.dueDate;
      this.tarea.status = newItem.status;
      if (this.tarea.status) {
        this.completado = this.tarea.status === 'Completado';
      } else {
        this.completado = false;
      }
    }
  }

  closeForm() {
    this.onCloseForm.emit();
  }

  executeAction() {
    this.onCloseForm.emit();
  }
}

