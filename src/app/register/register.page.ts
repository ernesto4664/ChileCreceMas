import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  regiones: any[] = [];
  comunas: any[] = [];
  selectedRegionId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertController: AlertController,
    private router: Router // Agregamos el Router
  ) {
    this.registerForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required], // Aquí está la confirmación de la contraseña
      fecha_nacimiento: ['', Validators.required],
      selectedRegionId: ['', Validators.required],
      selectedComunaId: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.loadRegiones();
  }

  passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    const password = form.get('password');
    const confirmPassword = form.get('password_confirmation');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { 'mismatch': true };
  }

  async loadRegiones() {
    this.apiService.getRegiones().subscribe(
      data => {
        this.regiones = data;
      },
      error => {
        this.presentAlert('Error', 'Error al cargar regiones: ' + error);
      }
    );
  }

  onRegionChange(event: any) {
    const regionId = event.detail.value;
    this.apiService.getComunas(regionId).subscribe(
      data => {
        this.comunas = data;
      },
      error => {
        this.presentAlert('Error', 'Error al cargar comunas: ' + error);
      }
    );
  }

  async register() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.apiService.register(formData).subscribe(
        async () => {
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'Registro exitoso. Por favor, inicia sesión.',
            buttons: [{
              text: 'OK',
              handler: () => {
                this.router.navigate(['/login']); // Redirige al usuario a la página de login
              }
            }]
          });
          await alert.present();
        },
        async error => {
          console.error('Error al registrar:', error);
          const errorMessage = error.error?.errors 
            ? Object.values(error.error.errors).reduce((acc: any[], val) => acc.concat(val), []).join(', ') 
            : error.error?.message || 'Error desconocido';
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Error al registrar: ' + errorMessage,
            buttons: ['OK']
          });
          await alert.present();
        }
      );
    } else {
      this.presentAlert('Error', 'Por favor, completa todos los campos correctamente.');
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
