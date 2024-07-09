import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';  // Importa AuthService

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  nombres: string = '';
  apellidos: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = ''; // Añadido para la confirmación de la contraseña
  edad: number | null = null;
  regiones: any[] = [];
  comunas: any[] = [];
  selectedRegionId: number | null = null;
  selectedComunaId: number | null = null;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private alertController: AlertController,
    private authService: AuthService  // Inyecta AuthService
  ) {}

  ngOnInit() {
    this.loadRegiones();
  }

  loadRegiones() {
    this.apiService.getRegiones().subscribe(
      (data) => {
        this.regiones = data;
        console.log('Regiones cargadas:', data);
      },
      (error) => {
        console.error('Error al cargar regiones:', error);
      }
    );
  }

  onRegionChange(event: any) {
    const regionId = event.detail.value;
    this.selectedRegionId = regionId;
    this.loadComunas(regionId);
  }

  loadComunas(regionId: number) {
    this.apiService.getComunas(regionId).subscribe(
      (data) => {
        this.comunas = data;
        console.log('Comunas cargadas:', data);
      },
      (error) => {
        console.error('Error al cargar comunas:', error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/choice']);
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  register() {
    if (this.password !== this.confirmPassword) {
      this.presentAlert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    this.apiService.register({
      nombres: this.nombres,
      apellidos: this.apellidos,
      email: this.email,
      password: this.password,
      password_confirmation: this.confirmPassword, // Añadido para la confirmación de la contraseña
      edad: this.edad,
      region_id: this.selectedRegionId,
      comuna_id: this.selectedComunaId,
    }).subscribe(
      (response) => {
        console.log('Registro exitoso');
        if (response && response.token) {
          this.authService.login(response.token); // Actualiza el estado de sesión
          this.router.navigate(['/home']);
        }
      },
      async (error) => {
        console.error('Error al registrar usuario:', error);
        let message = 'Error en la API; por favor, intenta nuevamente más tarde.';
        if (error.status === 422) {
          const errors = error.error.errors;
          message = 'Por favor, corrige los siguientes errores:<br>';
          for (const key in errors) {
            message += `${errors[key].join(' ')}<br>`;
          }
        }
        await this.presentAlert('Error de Registro', message);
      }
    );
  }
}
