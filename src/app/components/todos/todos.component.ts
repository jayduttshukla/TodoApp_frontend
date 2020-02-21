import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodosService } from '../../services/todos.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  constructor(private todosService : TodosService,private router: Router) {
   
  }
  
  todoValue: string;
  list: Todo[];
  loggedIn: boolean = false;
  tokenPayload: string;
  userName: string;
  ngOnInit() {
    this.todoValue = ""
    const jwtHelper = new JwtHelperService();
    this.tokenPayload = jwtHelper.decodeToken(localStorage.getItem("token"));
    this.userName =  (((jwtHelper.decodeToken(localStorage.getItem("token"))).name).split(" "))[0];
    this.getTodos();
  }

  getTodos() {
    this.todosService.getTodos().subscribe(async res => {
        if (res) {
          this.list = await res;
        } 
   })
 }

 addItem() {
   if(this.todoValue !== "" ){
     const newItem: Todo = {
       todoValue : this.todoValue,
       isDone: false,
       user_id: this.tokenPayload
     };
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

  onLogout(){
    this.router.navigate(['/']);
    localStorage.clear();
  }

}
