import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RegistrarUsuarioComponent } from './admin/registrar-usuario/registrar-usuario.component';
import { SoporteComponent } from './help/soporte/soporte.component';
import { TechnicalSupportComponent } from './help/technical-support/technical-support.component';
import { ReportesComponent } from './reportes/reportes.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { RoleGuard } from '../core/guards/role.guard';



export const PAGES_ROUTES: Routes = [
    {path: '', redirectTo: '/login', pathMatch:'full'},
    {path: 'login', component: LoginComponent},
    {path: 'registrar', component: RegistrarComponent, canActivate: [RoleGuard], data: { expectedRoles: ['analista', 'lider', 'administrador'] } },
    {path: 'consultar', component: ConsultarComponent, canActivate: [RoleGuard], data: { expectedRoles: ['lider', 'gestor de servicio', 'administrador'] } },
    {path: 'reportes', component: ReportesComponent, canActivate: [RoleGuard], data: { expectedRoles: ['gestor de servicio', 'administrador'] } },
    {path: 'admin', component: AdminComponent, canActivate: [RoleGuard], data: { expectedRoles: ['administrador'] }},
    {path: 'registrar-usuario', component: RegistrarUsuarioComponent, canActivate: [RoleGuard], data: { expectedRoles: ['administrador'] }},
    {path: 'soporte', component: SoporteComponent, canActivate: [RoleGuard], data: { expectedRoles: ['analista', 'lider', 'gestor de servicio','administrador'] }},
    {path: 'technical', component: TechnicalSupportComponent, canActivate: [RoleGuard], data: { expectedRoles: ['analista', 'lider', 'gestor de servicio','administrador'] }},
];
