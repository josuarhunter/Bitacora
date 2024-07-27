import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    EditarUsuarioComponent,
    NgIf,
    ReactiveFormsModule,
    NgFor
  
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit{
  formulario: FormGroup;
  usuarios: any[] = []; //lista de usuarios
  usuarioSeleccionado: any = null; // Usuario que se va a editar
  mostrarEditar: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
      this.formulario = this.formBuilder.group({
        nombre_usuario: new FormControl ('', [Validators.required])
      });
    }
    /* boton para actualizar lista de usuarios */
    ngOnInit(): void {
      this.obtenerUltimosUsuarios();
    }
    /* obtener ultimos usuarios */
    obtenerUltimosUsuarios(): void {
      this.userService.obtenerUltimosUsuarios().subscribe(data => {
        this.usuarios = data;
      });
    }
    /* buscar usuario */
    buscarUsuario(): void {
      if (this.formulario.valid) {
        const nombre_usuario = this.formulario.get('nombre_usuario')?.value;
        this.userService.buscarUsuario(nombre_usuario).subscribe(data => {
          this.usuarios = [data];
        });
      }
    }
    /* redirigir a registrar usuario */
    redirectRegistrarusuario() {
      this.router.navigate(['/registrar-usuario']);
    }
    /* editar usuario seleccionado */
    editarUsuario(id_usuario: number) {
      this.usuarioSeleccionado = this.usuarios.find(usuario => usuario.id_usuario === id_usuario);
      this.mostrarEditar = true;
    }
    /* mostrar usuario a editar */
    cerrarEditar() {
      this.mostrarEditar = false;
      this.usuarioSeleccionado = null;
      this.obtenerUltimosUsuarios();
    }
}