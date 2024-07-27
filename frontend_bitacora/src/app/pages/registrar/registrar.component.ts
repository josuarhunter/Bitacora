import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RegisterCaseService } from '../../core/services/register-case.service';


@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    HeaderComponent, 
    FooterComponent, 
    ReactiveFormsModule
  ],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent {
  formulario: FormGroup;
  isSubmitting: boolean = false; // Variable para controlar el estado de envío

  constructor( 
    private formBuilder: FormBuilder,
    private registrarCaseService: RegisterCaseService
  ) {
    this.formulario = this.formBuilder.group({
      no_caso: new FormControl ('', [Validators.required]),
      tipo_solicitud: new FormControl ('', [Validators.required]),
      cantidad_usuarios: new FormControl ('', [Validators.required, Validators.pattern('[0-9]+')]),
      aplicacion: new FormControl ('', [Validators.required]),
      herramienta: new FormControl ('', [Validators.required]),
      estado_caso: new FormControl ('', [Validators.required]),
      turno: new FormControl ('', [Validators.required]),
      cantidad_aplicaciones: new FormControl ('', [Validators.required]),
      lider: new FormControl ('', [Validators.required]),
      grupo_resolutor: new FormControl ('', [Validators.required]),
      id_tarea: new FormControl ('', [Validators.required]),
      observaciones: new FormControl ('', [Validators.required]),
      usuarios: this.formBuilder.array([this.createUserGroup()])
    });
  }
  
  get usuarios(): FormArray {
    return this.formulario.get('usuarios') as FormArray;
  }
  createUserGroup(): FormGroup {
    return this.formBuilder.group({
      cedula: ['', Validators.required],
      identidad_cliente: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
    });
  }

  addUser(): void {
    this.usuarios.push(this.createUserGroup());
  }

  deleteUser(index: number): void {
    this.usuarios.removeAt(index);
  }



  
  async onSubmit(): Promise<void> {
    if (this.formulario.valid && !this.isSubmitting) { // Asegurarse de que no se está enviando
      this.isSubmitting = true; // Bloquear nuevos envíos
      try {
        const userData = this.formulario.value;
        const response = await this.registrarCaseService.register(userData).toPromise();
        console.log('Registro de caso con éxito', response);
        alert('Se registró el caso de usuario con éxito!');
        this.formulario.reset(); // Reiniciar el formulario
        this.usuarios.clear();
        this.addUser(); // Reinitialize with one empty user group
      } catch (error: any) {
        console.error('Error en el registro de caso', error);
        alert('Error al registrar caso: ' + error.message);
      } finally {
        this.isSubmitting = false; // Permitir nuevos envíos
      }
    } else {
      console.error('Formulario no válido');
      
      alert('Por favor, complete todos los campos requeridos');
    }
  }
}

























