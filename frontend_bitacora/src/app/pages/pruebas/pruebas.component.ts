import { Component, OnInit,  } from '@angular/core';
import { FormsModule,  } from '@angular/forms';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-pruebas',
  standalone: true,
  imports: [
    HeaderComponent, 
    FooterComponent, 
    FormsModule, 
    CommonModule],
  templateUrl: './pruebas.component.html',
  styleUrl: './pruebas.component.scss'
})
export class PruebasComponent {
 
}