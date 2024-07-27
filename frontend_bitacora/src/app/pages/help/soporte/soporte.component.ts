import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-soporte',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './soporte.component.html',
  styleUrl: './soporte.component.scss'
})
export class SoporteComponent {
/* rutas de navegacion */
constructor(private router: Router) {}
redirectTechnical() {
  this.router.navigate(['/technical']);
}
  
}
