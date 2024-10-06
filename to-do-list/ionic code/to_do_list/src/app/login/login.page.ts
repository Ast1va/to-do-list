import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private http: HttpClient, 
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService
  ) {}

  async login() {
    const data = { email: this.email, password: this.password };
    this.http.post('http://localhost/todolist/login.php', data).subscribe(
      async (response: any) => {
        if (response.success) {
          
          this.authService.setSession(response.data);

          const alert = await this.alertController.create({
            header: 'Success',
            message: 'Giris Basarili',
            buttons: ['OK']
          });
          await alert.present();
          
          this.router.navigateByUrl('/home');
        } else {
          const alert = await this.alertController.create({
            header: 'Error',
            message: response.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.',
            buttons: ['OK']
          });
          await alert.present();
        }
      },
      async (error: HttpErrorResponse) => {
        let errorMessage = 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else if (error.status == 200) {
          errorMessage = 'Geçersiz JSON ' + error.error.text;
        }

        const alert = await this.alertController.create({
          header: 'Error',
          message: errorMessage,
          buttons: ['OK']
        });
        await alert.present();
        console.error('HTTP Error:', error);
      }
    );
  }
}
