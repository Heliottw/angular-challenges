import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { list } from 'postcss';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent implements AfterViewInit {
  @Input() customClass = '';
  @Input() items: any[] = [];
  @Output() addEvent = new EventEmitter<true>();
  @ContentChild('list') listTemplate!: TemplateRef<any>;

  constructor() {}

  addNewItem() {
    this.addEvent.emit(true);
  }

  ngAfterViewInit(): void {}
}
