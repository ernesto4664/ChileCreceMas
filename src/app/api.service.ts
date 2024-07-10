import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, { email, password }, { headers: headers }).pipe(
      map((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.authService.login(response.token);
        }
        return response;
      }),
      catchError(this.handleApiError)
    );
  }

  getRegiones(): Observable<any> {
    const url = `${this.baseUrl}/regiones`;
    return this.http.get(url).pipe(catchError(this.handleApiError));
  }

  getComunas(regionId: number): Observable<any> {
    const url = `${this.baseUrl}/regiones/${regionId}/comunas`;
    return this.http.get(url).pipe(catchError(this.handleApiError));
  }

  register(user: any): Observable<any> {
    const url = `${this.baseUrl}/register`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, user, { headers: headers }).pipe(
      map((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.authService.login(response.token);
        }
        return response;
      }),
      catchError(this.handleApiError)
    );
  }

  // Métodos para manejar miembros de la familia
  getFamilyMembers(): Observable<any> {
    const url = `${this.baseUrl}/familiars`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get(url, { headers: headers }).pipe(catchError(this.handleApiError));
  }

  addFamilyMember(member: any): Observable<any> {
    const url = `${this.baseUrl}/familiars`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(url, member, { headers: headers }).pipe(catchError(this.handleApiError));
  }

  updateFamilyMember(id: number, member: any): Observable<any> {
    const url = `${this.baseUrl}/familiars/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.put(url, member, { headers: headers }).pipe(catchError(this.handleApiError));
  }

  deleteFamilyMember(id: number): Observable<any> {
    const url = `${this.baseUrl}/familiars/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.delete(url, { headers: headers }).pipe(catchError(this.handleApiError));
  }

  private handleApiError(error: HttpErrorResponse) {
    let errorMessage = 'Error en la API; por favor, intenta nuevamente más tarde.';
    if (error.status === 422 && error.error.errors) {
      const errors = error.error.errors;
      errorMessage = Object.keys(errors).map(key => errors[key].join(' ')).join(' ');
    } else if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    return throwError(errorMessage);
  }
}
