import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';



@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.scss'
})
export class EditarUsuarioComponent implements OnChanges {
  @Input() usuario: any;
  @Output() cerrar = new EventEmitter<void>();
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
    this.formulario = this.formBuilder.group({
      nombres: new FormControl (''),
      apellidos: new FormControl (''),
      tipo_documento: new FormControl (''),
      no_identificacion: new FormControl (''),
      correo: new FormControl ('', [Validators.email]),
      fo_tipo_usuario: new FormControl (''),
      nombre_usuario: new FormControl (''),
      contraseña: new FormControl (''),
      estado: new FormControl (''),
      id_usuario: new FormControl ('')
    });
  }
  ngOnChanges() {
    if (this.usuario) {
      const userData = { ...this.usuario };
      userData.contraseña = ''; // Establece el valor de contraseña en una cadena vacía
      this.formulario.patchValue(userData);
    }
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const userData = this.formulario.value;
      this.userService.editUser(userData).subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response);  // Verifica la respuesta en la consola
          if (response.success) {
            alert('Usuario actualizado con éxito');
            this.cerrar.emit();
          } else {
            alert('Error al actualizar el usuario');
          }
        },
        (error: any) => {
          console.error('Error en la solicitud:', error);  // Verifica el error en la consola
          alert('Error en la solicitud');
        }
      );
    } else {
      alert('Formulario inválido');
    }
  }
}