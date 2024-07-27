import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  private EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  private EXCEL_EXTENSION = '.xlsx';

  constructor() { }
  /* Método que exporta un array de objetos a un archivo Excel */
  public exportAsExcelFile(data: any[], excelFileName: string): void {
    const worksheetData = [
      ['Analista Accesos', 
        'Caso MyIT', 
        'Tipo de solicitud', 
        'Cedula', 
        'Identidad', 
        'Nombre Completo Usuario', 
        'Apellidos Completo Usuario', 
        'Aplicación/Legado/BD/SO', 
        'Herramienta', 
        'Id Tarea', 
        'Grupo Resolutor', 
        'Fecha Solución', 
        'Estado del caso', 
        'Observaciones'],
      ...data.map(item => [
        item.usuario,
        item.no_caso,
        item.tipo_solicitud,
        item.cedula_cliente,
        item.identidad_cliente,
        item.nombres_cliente,
        item.apellidos_cliente,
        item.aplicacion,
        item.herramienta,
        item.id_tarea,
        item.grupo_resolutor,
        item.fecha_registro,
        item.estado_caso,
        item.observaciones
      ])
    ];
    /* Convertimos el array en una hoja de cálculo de Excel */
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(worksheetData);
    
    // Aplicar estilos a los encabezados
    

    
    /*  Creamos un libro de Excel que contiene la hoja de cálculo */
    const workbook: XLSX.WorkBook = { Sheets: { 'Reporte': worksheet }, SheetNames: ['Reporte'] };
    /* Convertimos el libro de Excel en un buffer de bytes */
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    /* Llamamos al método saveAsExcelFile para guardar el archivo Excel en el cliente */
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  /* Método que guarda el archivo Excel en el cliente */
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });   
    /* Utilizar la biblioteca FileSaver para guardar el archivo Excel en el cliente */
    FileSaver.saveAs(data, `Reporte_${new Date().toLocaleDateString().replace(/\//g, '-')}_${new Date().toLocaleTimeString().replace(/:/g, '-')}` + this.EXCEL_EXTENSION);
  }
}
