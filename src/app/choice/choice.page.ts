import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.page.html',
  styleUrls: ['./choice.page.scss'],
})
export class ChoicePage {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToGuestHome() {
    this.router.navigate(['/home-guest']);
  }

  navigateToForgotPassword() {
    // Implementar navegación para "¿Olvidaste tu contraseña?" si es necesario
  }
}
