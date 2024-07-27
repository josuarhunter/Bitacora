import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formulario: FormGroup;
  errorMessage: string | null = null;
  
  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private authService: AuthService
   
  ) {
    this.formulario = this.formBuilder.group({
      username: new FormControl ('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+')]),
      password: new FormControl ('', [Validators.required])
    });
  }
  
async onSubmit(): Promise<void> {
  if (this.formulario.valid) {
    const { username, password } = this.formulario.value;
    try {
      const response = await (this.authService.login(username, password)).toPromise();
      console.log('Login exitoso', response);
      sessionStorage.setItem('authToken', response.token);

      // Obtener roles del usuario
        const roles = this.authService.getUserRole();

        if (roles) {
          // Redirigir al usuario basado en su rol
          if (roles.includes('administrador')) {
            this.router.navigate(['/admin']);
          } else if (roles.includes('gestor de servicio')) {
            this.router.navigate(['/reportes']);
          } else if (roles.includes('lider')) {
            this.router.navigate(['/consultar']);
          } else if (roles.includes('analista')) {
            this.router.navigate(['/registrar'])
          }
        }
      } catch (error) {
        console.error('Error en el login', error);
        this.errorMessage = 'Error en el inicio de sesión. Por favor, verifica tus credenciales.';
      }
    } else {
      console.error('Formulario no válido');
      this.errorMessage = 'Formulario no válido. Por favor, completa todos los campos correctamente.';
    }
  }
}


