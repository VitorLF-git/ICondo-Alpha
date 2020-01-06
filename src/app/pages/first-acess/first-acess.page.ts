import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Todo, UserDbService } from 'src/app/services/user-db.service';

@Component({
  selector: 'app-first-acess',
  templateUrl: './first-acess.page.html',
  styleUrls: ['./first-acess.page.scss'],
})
export class FirstAcessPage implements OnInit { 
  todo: Todo = {
    task: 'test',
    createdAt: new Date().getTime(),
    priority: 2
  };
 
  todoId = null;
 
  constructor(private route: ActivatedRoute, private nav: NavController, private todoService: UserDbService, private loadingController: LoadingController) { }
 
  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId)  {
      this.loadTodo();
    }
  }
 
  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });
    await loading.present();
 
    this.todoService.getTodo(this.todoId).subscribe(res => {
      loading.dismiss();
      this.todo = res;
    });
  }
 
  async saveTodo() {
 
    const loading = await this.loadingController.create({
      message: 'Saving Todo..'
    });
    await loading.present();
 
    if (this.todoId) {
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        loading.dismiss();
        /** this.nav.back('home'); ROUTE TO APP, SAME AS LOGIN */
      });
    } else {
      this.todoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        /**this.nav.goBack('home'); ROUTE TO APP, SAME AS LOGIN*/
      });
    }
  }
 
}