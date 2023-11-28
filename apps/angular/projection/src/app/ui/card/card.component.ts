import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() customClass = '';
  @Input() items: any[] = [];
  @Output() addEvent = new EventEmitter<true>();
  @Output() deleteEvent = new EventEmitter<number>();

  constructor() {}

  addNewItem() {
    this.addEvent.emit(true);
  }

  handleDelete(id: number) {
    this.deleteEvent.emit(id);
  }
}
