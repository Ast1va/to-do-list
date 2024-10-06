import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  task: any = {};

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.task = JSON.parse(params['task']);
    });
  }

  updateTask() {
    this.http.post('http://localhost/todolist/update_task.php', this.task)
      .subscribe(response => {
        
        this.router.navigate(['/home']);
      });
  }

  deleteTask(event: any) {
    this.http.post('http://localhost/todolist/delete_task.php', { id: this.task.id })
      .subscribe(response => {
        
        this.router.navigate(['/home']);
        this.refreshPage(event);
      });
  }

  refreshPage(event: any) {
    this.router.navigateByUrl(this.router.url, { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
      event.target.complete();
    });
  }
}
