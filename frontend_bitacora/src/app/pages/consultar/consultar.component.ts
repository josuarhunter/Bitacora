import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ConsultCaseService } from '../../core/services/consult-case.service';

@Component({
  selector: 'app-consultar',
  standalone: true,
  imports: [
    FormsModule,
    NgIf, 
    NgFor,
    HeaderComponent, 
    FooterComponent,
    ReactiveFormsModule
  ],
  templateUrl: './consultar.component.html',
  styleUrl: './consultar.component.scss'
})
export class ConsultarComponent {
  formulario: FormGroup;
  resultados: any[] = [];
  mensajeError: string = ''
  casoSeleccionado: any = null;

  
  constructor(
    private formBuilder : FormBuilder,
    private consultCaseService: ConsultCaseService
  ) {
    this.formulario = this.formBuilder.group({
      no_identificacion: new FormControl ('', [Validators.required]),
      tipo_identificacion: new FormControl ('', [Validators.required]),
      fecha_inicial: new FormControl (''),
      fecha_final: new FormControl (''),
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.consultCaseService.consult(this.formulario.value).subscribe(
        (data) => {
          this.resultados = data;
          if (this.resultados.length === 0) {
            this.mensajeError = 'No se encontraron registros para los criterios de búsqueda ingresados.';
          } else {
            this.mensajeError = '';
          }
        },
        (error) => {
          this.mensajeError = 'Error en la búsqueda. Intente nuevamente.';
          console.error('Error en la búsqueda', error);
        }
      );
    } else {
      this.mensajeError = 'Complete los campos necesarios para la búsqueda.';
    }
  }
  verDetalles(caso: any) {
    this.casoSeleccionado = caso;
  }
  reiniciarConsulta(): void {
    this.formulario.reset();
    this.resultados = [];
    this.casoSeleccionado = null;
  }
}