import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IListItems } from '../../interface/IListItems.iterface';

@Component({
  selector: 'app-input-add-item',
  templateUrl: './input-add-item.component.html',
  styleUrls: ['./input-add-item.component.scss'],
})
export class InputAddItemComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef)

  @ViewChild("inputText") inputText!: ElementRef

  constructor() { }

  ngOnInit() {
  }

  @Input({required: true}) inputListItems: IListItems[] = []

  @Output() outputAddListItem = new EventEmitter<IListItems>()

  public focusAndAddItem(value: string){
    if(value){
      this.cdr.detectChanges()
      this.inputText.nativeElement.value = ''
    
      const currentDate = new Date()
      const timestamp = currentDate.getTime()
      const id = `ID ${timestamp}`

      this.outputAddListItem.emit({
        checked: false,
        value,
        id
      })

      return this.inputText.nativeElement.focus();
    }
  }

}
