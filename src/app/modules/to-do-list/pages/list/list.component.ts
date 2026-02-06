import { Component, OnInit, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { IListItems } from '../../interface/IListItems.iterface';
import { InputListItemsComponent } from "../../components/input-list-items/input-list-items.component";
import { ELocalStorage } from '../../enum/ELocalStorage.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  imports: [InputAddItemComponent, InputListItemsComponent],
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  public addItem = signal(true);

  private setListItems = signal<IListItems[]>(this.parseItems())

  getListItems = this.setListItems.asReadonly()

  private parseItems(){
    return JSON.parse(localStorage.getItem('@my-list') || '[]')
  }
  
  getInputAndAddItem(value: IListItems){
     localStorage.setItem(
      '@my-list', JSON.stringify([... this.setListItems(),value])
     )

     return this.setListItems.set(this.parseItems())
  }

  listItemsStage(value: 'pending' | 'completed'){
    return this.getListItems().filter((res: IListItems) =>{
      if(value == 'pending'){
        return !res.checked
      }

      if(value == 'completed'){
        return res.checked
      }

      return res
    })
  }

  private updateLocalStorage(){
    return localStorage.setItem('@my-list', JSON.stringify(this.setListItems()))
  }

  updateCheckBox(newItem: {id: string, checked: boolean}){
    this.setListItems.update((oldValue: IListItems[])=>{
      oldValue.filter( res =>{
        if(res.id === newItem.id){
          res.checked = newItem.checked
          return res
        }

        return res
      })
      return oldValue
    })

    return this.updateLocalStorage()
  }

  updateItemText(newItem: {id: string, value: string}){
        this.setListItems.update((oldValue: IListItems[])=>{
      oldValue.filter( res =>{
        if(res.id === newItem.id){
          res.value = newItem.value
          return res
        }

        return res
      })
      return oldValue
    })

    return this.updateLocalStorage()
  }

  deleteItem(id: string){
    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, apagar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.setListItems.update((oldValue: IListItems[])=>{
          return oldValue.filter((res) => res.id !== id)
        })

        return this.updateLocalStorage()
      }
    });

  }
  deleteAllItems(){

    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, apagar tudo",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(ELocalStorage.MY_LIST)
        return this.setListItems.set(this.parseItems())
      }
    });

  }
}
