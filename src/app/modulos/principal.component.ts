import { Component } from '@angular/core';
import { HeaderComponent } from "../estructura/header/header.component";
import { NavComponent } from "../estructura/nav/nav.component";
import { FooterComponent } from "../estructura/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-principal',
    standalone: true,
    templateUrl: './principal.component.html',
    styleUrl: './principal.component.scss',
    imports: [HeaderComponent, NavComponent, FooterComponent, RouterOutlet]
})
export class PrincipalComponent {

}
