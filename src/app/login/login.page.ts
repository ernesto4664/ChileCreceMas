import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private alertController: AlertController
  ) {}

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  login() {
    if (!this.email || !this.password) {
      this.presentAlert('Campos Incompletos', 'Por favor, completa todos los campos.');
      return;
    }
  
    this.apiService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso', response);
        this.router.navigate(['/home']);
      },
      async (error) => {
        console.error('Error al iniciar sesión:', error);
        let message = 'Error en la API; por favor, intenta nuevamente más tarde.';
  
        if (error.status === 422 && error.error.errors) {
          const errors = error.error.errors;
          message = Object.keys(errors).map(key => errors[key].join(' ')).join(' ');
        }
  
        await this.presentAlert('Error de Inicio de Sesión', message);
      }
    );
  }

  navigateToForgotPassword() {
    // Implementa la navegación para "¿Olvidaste tu contraseña?" si es necesario
  }
}
