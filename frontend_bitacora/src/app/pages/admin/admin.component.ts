import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    HeaderComponent, 
    FooterComponent, 
    EditarUsuarioComponent,
    UsuariosComponent
    
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
}
