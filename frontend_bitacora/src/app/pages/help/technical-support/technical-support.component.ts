import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { TechnicalSupportService } from '../../../core/services/technical-support.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-technical-support',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './technical-support.component.html',
  styleUrl: './technical-support.component.scss'
})
export class TechnicalSupportComponent {
  formulario: FormGroup;
  error: string = '';

  constructor (
    private formBuilder: FormBuilder,
    private supportService: TechnicalSupportService
  ) 
   {
    this.formulario = this.formBuilder.group({
      comentario: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      image: new FormControl ('')
    });
  }
  

  onFileChange(event: any): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.formulario.patchValue({ image: file });
    }
  }

  removeFile(): void {
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (input) {
      input.value = '';
      this.formulario.patchValue({ image: null });
    }
  }
  
  onSubmit(): void {
    if (this.formulario.invalid) {
      this.error = 'Por favor complete todos los campos obligatorios correctamente.';
      return;
    }

    const formData = this.createFormData();
    this.supportService.sendEmail(formData).subscribe(
      response => {
        console.log(response);
        this.error = '';
        this.formulario.reset();
        alert('Mensaje enviado con exito!')
      },
      error => {
        console.error(error);
        this.error = 'Error al enviar el formulario. Inténtalo nuevamente.';
      }
    );
  }

  private createFormData(): FormData {
    const formData = new FormData();
    formData.append('comentario', this.formulario.get('comentario')?.value);
    formData.append('username', this.formulario.get('username')?.value);
    formData.append('correo', this.formulario.get('correo')?.value);

    const file: File = this.formulario.get('image')?.value;
    if (file) {
      formData.append('file', file, file.name);
    }

    return formData;
  }
}