import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/bitacora/backend/controllers/Auth.controller.php'; 

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { nombre_usuario: username, contraseña: password };

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      tap(response => {
        if (response.token) {
          sessionStorage.setItem('authToken', response.token); // Guardar el token en sessionStorage
          const decodedToken = jwtDecode<{ tipo_usuario: string }>(response.token);
          sessionStorage.setItem('userRole', decodedToken.tipo_usuario); // Guardar el rol del usuario en sessionStorage
          sessionStorage.setItem('username', username); // Almacenar el nombre de usuario 
        }
      })
    );
  }
  /* almacenamiento de token */
  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }
 /* obtener rol del usuario */
 getUserRole(): string | null {
  return sessionStorage.getItem('userRole');
}

  /* cerrar sesion */
  logout(): void {
    try {
      if (sessionStorage.hasOwnProperty('authToken')) {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('username');
        alert('Sesión cerrada con éxito.');
        window.location.href = '/login'; // 
      } else {
        console.log('No estás autenticado. No se ha eliminado ningún token.');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}