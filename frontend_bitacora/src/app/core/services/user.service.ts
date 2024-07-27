import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost/bitacora/backend/controllers';
  
  constructor(private http: HttpClient) { }

  obtenerUltimosUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-list.controller.php`);
  }

  buscarUsuario(nombre_usuario: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search-users.controller.php?nombre_usuario=${nombre_usuario}`);
  }

  editUser(userData: any): Observable<any> {
    // Hashear la contraseña si está presente
    if (userData.contraseña) {
      const salt = bcrypt.genSaltSync(10);
      userData.contraseña = bcrypt.hashSync(userData.contraseña, salt);
    }
    return this.http.post<any>(`${this.apiUrl}/edit-user.controller.php`, userData);
  }
}
