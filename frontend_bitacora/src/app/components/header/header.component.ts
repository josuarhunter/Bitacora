import { Component, HostBinding, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
/* accion de menu desplegable */
  isExpanded = false;
  userRole: string | null = null;
  username: string | null = null;
  @HostBinding('class.expanded') get expanded() {
    return this.isExpanded;
  }


  constructor(
    /* rutas de navegacion */
    private router: Router,
    /* cierre de sesion */
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
    this.username = sessionStorage.getItem('username');
  }

  /* cerrar sesión */
  logout(): void {
    this.authService.logout();
  }
  /* rutas de navegacion */
  redirectRegistrar() {
    this.router.navigate(['/registrar']);
  }
  redirectConsultar() {
    this.router.navigate(['/consultar'],); 
  }
  redirectReportes() {
    this.router.navigate(['/reportes'],);
  }
  redirectSoporte() {
    this.router.navigate(['/soporte'],);
  }
  /* admin */
  redirectAdmin() {
    this.router.navigate(['/admin'],)
  }
  canShowAdmin(): boolean {
    return this.userRole === 'administrador';
  }

  canShowRegistrar(): boolean {
    return ['lider','analista', 'administrador'].includes(this.userRole || '');
  }

  canShowConsultar(): boolean {
    return ['lider', 'gestor de servicio', 'administrador'].includes(this.userRole || '');
  }

  canShowReportes(): boolean {
    return ['gestor de servicio', 'administrador'].includes(this.userRole || '');
  }
}

