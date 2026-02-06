import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IListItems } from '../../interface/IListItems.iterface';

@Component({
  selector: 'app-input-list-items',
  templateUrl: './input-list-items.component.html',
  styleUrls: ['./input-list-items.component.css']
})
export class InputListItemsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input({required: true}) inputListItems: IListItems[] = []

  @Output() outputUpdateItemCheckbox = new EventEmitter<{
    id: string,
    checked: boolean}>()

  updateItemCheckBox(id: string, checked: boolean){
      return this.outputUpdateItemCheckbox.emit({id, checked})
  }

  @Output() outputUpdateItemText = new EventEmitter<{
    id: string,
    value: string}>()

  updateItemText(id: string, value: string){
      return this.outputUpdateItemText.emit({id, value})
  }

  @Output() outputDeleteItem = new EventEmitter<{
  id: string}>()

  deleteItem(id: string){
      return this.outputDeleteItem.emit({id})
  }
}
