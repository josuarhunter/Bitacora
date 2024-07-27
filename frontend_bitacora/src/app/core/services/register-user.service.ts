import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService{
  private apiUrl = 'http://localhost/bitacora/backend/controllers/register-user.controller.php';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    // Log para verificar los datos antes de enviar la solicitud
    console.log('Enviando solicitud de registro', userData); 
    // hashing de la contraseña aquí
    const salt = bcrypt.genSaltSync(10);
    userData.contraseña = bcrypt.hashSync(userData.contraseña, salt);
    // Enviar la solicitud POST al backend
    return this.http.post(this.apiUrl, userData);
  }
}
