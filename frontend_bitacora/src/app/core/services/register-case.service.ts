import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterCaseService {
  private apiUrl = 'http://localhost/bitacora/backend/controllers/register-case.controller.php';

  constructor(private http: HttpClient, private authService: AuthService) {}

  register(userData: any): Observable<any> {
    // Obtener el token del AuthService
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Token no disponible');
    }

    // Configurar las cabeceras
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });


    // Log para verificar los datos antes de enviar la solicitud
    console.log('Enviando solicitud de registro de caso', headers)
    // Enviar la solicitud con las cabeceras configuradas; 
    return this.http.post(this.apiUrl, userData, { headers });
  }
}