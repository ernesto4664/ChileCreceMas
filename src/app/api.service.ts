import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Noticia } from './models/noticia'; // Asegúrate de tener un modelo Noticia definido

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

  getFamilyMembers(): Observable<any> {
    const url = `${this.baseUrl}/familiars`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get(url, { headers: headers }).pipe(catchError(this.handleApiError));
  }

  getFamilyMemberBenefits(memberId: number): Observable<any> {
    const url = `${this.baseUrl}/familiars/${memberId}/benefits`;
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
    return this.http.post(url, member, { headers: headers }).pipe(
      catchError(this.handleApiError)
    );
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

  getSemanasEmbarazo(): Observable<any> {
    const url = `${this.baseUrl}/semanas_embarazos`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get(url, { headers: headers }).pipe(catchError(this.handleApiError));
  }

  getAges(): Observable<any> {
    const url = `${this.baseUrl}/edades`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get(url, { headers: headers }).pipe(catchError(this.handleApiError));
  }

  getTiposDeRegistro(): Observable<any> {
    const url = `${this.baseUrl}/tipos-de-registro`;
    return this.http.get(url).pipe(catchError(this.handleApiError));
  }

  getUsuarioPFechaNacimiento(usuarioP_id: number): Observable<any> {
    const url = `${this.baseUrl}/usuariop/${usuarioP_id}/fecha_nacimiento`;
    return this.http.get(url).pipe(catchError(this.handleApiError));
  }

  getCurrentUser(): Observable<any> {
    const url = `${this.baseUrl}/user`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get(url, { headers: headers }).pipe(catchError(this.handleApiError));
  }

  getNoticias(): Observable<Noticia[]> {
    const url = `${this.baseUrl}/noticias`;
    return this.http.get<Noticia[]>(url).pipe(
      map((noticias: Noticia[]) => {
        console.log('Noticias recibidas:', noticias); // Para verificar qué se recibe antes del filtro
        return noticias
          .filter(noticia => noticia.status === 'Publicado') // Asegúrate de que coincide con 'Publicado'
          .sort((a, b) => Number(a.privilegio) - Number(b.privilegio))
          .slice(0, 5);
      }),
      catchError(this.handleApiError)
    );
  }

  getNoticiaById(id: number): Observable<Noticia> {
    const url = `${this.baseUrl}/noticias/${id}`;
    return this.http.get<Noticia>(url).pipe(
      catchError(this.handleApiError)
    );
  }

  checkGestanteUsed(userId: number): Observable<boolean> {
    const url = `${this.baseUrl}/check-gestante-used/${userId}`;
    return this.http.get<boolean>(url).pipe(catchError(this.handleApiError));
  }

  getNoticiasPaginadas(page: number = 1, limit: number = 10): Observable<any> {
    const url = `${this.baseUrl}/noticias-paginadas?page=${page}&limit=${limit}`;
    return this.http.get(url).pipe(
      map((response: any) => response),
      catchError(this.handleApiError)
    );
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
