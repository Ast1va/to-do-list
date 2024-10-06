import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage {
  task = {
    title: '',
    location: '',
    date: '',
    time: '',
    description: ''
  };

  constructor(private http: HttpClient, private router: Router) { }

  addTask() {
    this.http.post('http://localhost/todolist/add_task.php', this.task)
      .subscribe(response => {
       
        this.router.navigate(['/home']);
      });
  }
}
