import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'tareas-item',
  templateUrl: './item.component.html',
})
export class ItemComponent implements OnInit {
  @Input() item: any = null;

  @Output() onAddItem: EventEmitter<any> = new EventEmitter();
  @Output() onEditItem: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteItem: EventEmitter<any> = new EventEmitter();

  public searchInput: any = null;
  public searchDueDate: any = null;

  ngOnInit(): void {
    
  }

  addItem() {
    this.onAddItem.emit();
  }
  
  editItem() {
    this.onEditItem.emit(this.item);
  }
  
  deleteItem($event: any) {
    this.onDeleteItem.emit({event: $event, item: this.item});
  }
}

