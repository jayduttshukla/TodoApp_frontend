import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  constructor(private todosService : TodosService) { }
  
  todoValue: string;
  list: Todo[];

  ngOnInit() {
    this.todoValue = ""
    this.getTodos();
  }

  getTodos() {
    this.todosService.getTodos().subscribe(async res => {
     if (res) {
       console.log('response :',res)
       this.list = await res;
       console.log(this.list)
     } else {
       console.log("Todos Error");
     }  
   })
 }

 addItem() {
   if(this.todoValue !== "" ){
     const newItem: Todo = {
       todoValue : this.todoValue,
       isDone: false
     };
     console.log('newItem ',newItem)
     this.todosService.AddTodo(newItem).subscribe(() =>  this.getTodos());
   }
   this.todoValue = ""
 }

  deleteItem(id:String){
    this.todosService.removeTodo(id).subscribe(() => this.getTodos());
  }

 changeTodoStatus(id, status){
   this.todosService.todoStatusChange(id,status.target.checked).subscribe(() => this.getTodos());
  }

}
