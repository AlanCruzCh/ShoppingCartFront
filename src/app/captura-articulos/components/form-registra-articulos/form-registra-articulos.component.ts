import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal, { SweetAlertIcon } from 'sweetalert2';

import { newArticule } from 'src/app/interfaces/formNewArticule.interfaces';

@Component({
  selector: 'captura-articulos-form-registra-articulos',
  templateUrl: './form-registra-articulos.component.html',
  styleUrls: ['./form-registra-articulos.component.css']
})
export class FormRegistraArticulosComponent {

  @Output()
  public dataFormulario = new EventEmitter<newArticule>();
  @ViewChild('inputImgUploading') fileInput!: ElementRef;
  public imgLoadFromNavegator!: any;
  public formRegistraArticulos: FormGroup = this.fb.group({
    cantidad: [ '', [Validators.required ] ],
    costo: [ '', [Validators.required] ],
    description: [ '', [Validators.required] ],
    inputImgUploading: [null , [Validators.required] ],
    inputBinaryImg: [null, [Validators.required] ],
  });

  constructor (
    private fb: FormBuilder,
  ) { }

  public activaInput(): void{
    this.fileInput.nativeElement.click();
  }

  public cargandoImg(event: any) {
    const file: File = event.target.files[0];
    if (file && this.esTipoDeImagen(file.name)) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const binaryArray = reader.result as ArrayBuffer;
        const dataUrl = this.arrayBufferToDataURL(binaryArray);
        this.imgLoadFromNavegator = dataUrl;
        this.formRegistraArticulos.patchValue({
          inputBinaryImg: binaryArray,
        });
      };
      reader.readAsArrayBuffer(file);
    } else {
      this.alertaError('Por favor, selecciona un archivo de imagen con extensión PNG o png', 'warning');
    }
  }

  public validaCampoForm( nombreCampo: string): boolean | null {
    return this.formRegistraArticulos.controls[nombreCampo].errors && this.formRegistraArticulos.controls[nombreCampo].touched;
  }

  public obtenerError( nombreCampo: string ): string | null{
    if ( !this.formRegistraArticulos.controls[nombreCampo] ) return null;
    const errors = this.formRegistraArticulos.controls[nombreCampo].errors || {};
    for (const key of Object.keys(errors)) {
      switch( key )  {
        case 'required':
          return 'Este campo es requerido';
      }
    }
    return '';
  }

  public limpiaFormulario(): void {
    this.formRegistraArticulos.reset({cantidad: '', costo: '', description: '', inputImgUploading: null, inputBinaryImg: null});
  }

  public gurdaDatosForm(): void {
    if( this.formRegistraArticulos.invalid ) {
      this.formRegistraArticulos.markAllAsTouched();
      this.alertaError('Revise que haya seleccionado una imagen y todos los campos este llenos, verifique por favor', 'error');
      return;
    }
    this.mandarForm();
  }

  private arrayBufferToDataURL( buffer: ArrayBuffer ): string {
    const blob = new Blob( [buffer] , { type: 'image/png' } ); // Puedes ajustar el tipo MIME según el tipo de archivo
    const urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL( blob );
  }

  private esTipoDeImagen( nombreArchivo: string ): boolean {
    const extensionesPermitidas = ['png'];
    const extension = nombreArchivo.split('.').pop()?.toLowerCase();
    return extensionesPermitidas.includes( extension! );
  }

  private alertaError(titleAlert: String, tipoIcon: SweetAlertIcon): void{
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: true,
      confirmButtonText: 'OK',
      timer: 4000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: tipoIcon,
      title: titleAlert
    });
  }

  private mandarForm(): void{
    const data: newArticule = {
      cantidad: this.formRegistraArticulos.get('cantidad')?.value,
      costo: this.formRegistraArticulos.get('costo')?.value,
      descripcion: this.formRegistraArticulos.get('description')?.value,
      imagen: this.formRegistraArticulos.get('inputBinaryImg')?.value,
    }
    this.dataFormulario.emit(data);
    this.limpiaFormulario();
  }

}


