import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router'; // Importa Router
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { FacebookLogin, FacebookLoginResponse } from '@capacitor-community/facebook-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private router: Router // Inyecta Router
  ) {}

  login(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login'], { replaceUrl: true }); // Redirige y limpia el historial
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // Métodos para inicio de sesión con Google y Facebook
  async loginWithGoogle(): Promise<void> {
    try {
      const res = await GoogleAuth.signIn();
      const response = await this.http.post(`${this.baseUrl}/login/google`, { idToken: res.authentication.idToken }).toPromise();
      this.handleAuthResponse(response);
    } catch (error: any) {
      console.error('Error al iniciar sesión con Google', error);
      throw new Error('Error al iniciar sesión con Google: ' + error.message);
    }
  }

  async loginWithFacebook(): Promise<void> {
    try {
      const FACEBOOK_PERMISSIONS = ['public_profile', 'email'];
      const res = await FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
      if (res.accessToken) {
        const response = await this.http.post(`${this.baseUrl}/login/facebook`, { accessToken: res.accessToken.token }).toPromise();
        this.handleAuthResponse(response);
      } else {
        throw new Error('Error al obtener el token de acceso de Facebook');
      }
    } catch (error: any) {
      console.error('Error al iniciar sesión con Facebook', error);
      throw new Error('Error al iniciar sesión con Facebook: ' + error.message);
    }
  }

  private handleAuthResponse(response: any): void {
    if (response && response.token) {
      this.login(response.token);
    } else {
      throw new Error('Error en la respuesta de autenticación');
    }
  }
}
