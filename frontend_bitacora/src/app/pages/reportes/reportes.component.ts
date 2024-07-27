import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ReportService } from '../../core/services/report.service';
import { DownloadService } from '../../core/services/download.service';


@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterOutlet, NgIf, NgFor,ReactiveFormsModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent {
  formulario: FormGroup;
  resultados: any[] = [];
  mensajeError: string = ''
  

  
  constructor(
    private formBuilder : FormBuilder,
    private reportService: ReportService,
    private downloadService: DownloadService
  ) {
    this.formulario = this.formBuilder.group({
      fecha_inicial: new FormControl ('',[Validators.required]),
      fecha_final: new FormControl ('',[Validators.required]),
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.reportService.consult(this.formulario.value).subscribe(
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
  
  reiniciarConsulta(): void {
    this.formulario.reset();
    this.resultados = [];
  }

  descargarReporte() {
    if (this.resultados.length > 0) {
      this.downloadService.exportAsExcelFile(this.resultados, 'reporte');
    } else {
      this.mensajeError = 'No hay datos para descargar.';
    }
  }
}