import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { NgIf } from '@angular/common';

import { Validators, FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { RegistrarService} from '../../../core/services/register-user.service';

@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,  NgIf, ReactiveFormsModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.scss'
})
export class RegistrarUsuarioComponent {
  formulario: FormGroup;
  isSubmitting: boolean = false; // Variable para controlar el estado de envío

  constructor(
    private formBuilder: FormBuilder, 
    private registrarService: RegistrarService

  ) {
    this.formulario = this.formBuilder.group({
      nombres: new FormControl ('', [Validators.required]),
      apellidos: new FormControl ('', [Validators.required]),
      tipo_documento: new FormControl ('', [Validators.required]),
      no_identificacion: new FormControl ('', [Validators.required]),
      correo: new FormControl ('', [Validators.required]),
      tipo_usuario: new FormControl ('', [Validators.required]),
      nombre_usuario: new FormControl ('', [Validators.required]),
      contraseña: new FormControl ('', [Validators.required]),
    });
  }

  async onSubmit(): Promise<void> {
    if (this.formulario.valid && !this.isSubmitting) { // Asegurarse de que no se está enviando
      this.isSubmitting = true; // Bloquear nuevos envíos
      /* console.log('Formulario enviado', this.formulario.value); */ // Log para verificación
      try {
        const userData = this.formulario.value;
        const response = await this.registrarService.register(userData).toPromise();
        console.log('Usuario registrado', response);
        alert('Usuario registrado con éxito!');
        this.formulario.reset(); // reiniciar el formulario
      } catch (error: any) {
        console.error('Error en el registro', error);
        alert('Error al registrar usuario: ' + error.message);
      } finally {
        this.isSubmitting = false; // Permitir nuevos envíos
      }
    } else {
      console.error('Formulario no válido');
      alert('Por favor, complete todos los campos requeridos');
    }
  }
}