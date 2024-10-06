import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formData = {
    user_name: '',
    password: '',
    email: '',
  };

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  async create() {
    
    if (!this.formData.user_name || !this.formData.password || !this.formData.email) {
      const alert = await this.alertController.create({
        header: 'Hata',
        message: 'Lütfen tüm alanları doldurun.',
        buttons: ['Tamam']
      });
      await alert.present();
      return;
    }

    try {
      
      const response = await axios.post("http://localhost/todolist/user.php", this.formData);
      console.log(response);

      
      const alert = await this.alertController.create({
        header: 'Başarılı',
        message: 'Kayıt başarılı',
        buttons: ['Tamam']
      });

      await alert.present();
    } catch (error) {
      console.log(error);
      
      const alert = await this.alertController.create({
        header: 'Hata',
        message: 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.',
        buttons: ['Tamam']
      });
      await alert.present();
    }
  }
}
