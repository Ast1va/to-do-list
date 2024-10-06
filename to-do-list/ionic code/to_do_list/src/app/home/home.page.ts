import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Task {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  description: string;
  weather?: any;
  events?: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  nearestTask: Task | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
    } else {
      this.getTasks();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  getTasks() {
    this.http.get<{ tasks: Task[], nearestTask: Task }>('http://localhost/todolist/get_task.php')
      .subscribe(response => {
        this.tasks = response.tasks;
        this.nearestTask = response.nearestTask;
      }, error => {
        console.error('Error fetching tasks:', error);
      });
  }

  viewTask(task: Task) {
    this.router.navigate(['/view'], { queryParams: { task: JSON.stringify(task) } });
  }

  goToAddTask() {
    this.router.navigate(['/add-task']);
  }
}
