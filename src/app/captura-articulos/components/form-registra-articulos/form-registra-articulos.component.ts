import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { newArticule } from 'src/app/interfaces/formNewArticule.interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';

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
    private alertService: AlertService,
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
      this.alertService.alertaError('Por favor, selecciona un archivo de imagen con extensión PNG o png', 'warning');
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
      this.alertService.alertaError('Revise que haya seleccionado una imagen y todos los campos este llenos, verifique por favor', 'error');
      return;
    }
    this.alertService.alertConfirmAction('Registra nuevo articulo', '¿Seguro que desea registrar este nuevo articulo?')
    .then( ( isConfirmed ) => {
      if (isConfirmed) {
        this.mandarForm();
      }
    });
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

  private mandarForm(): void{
    const decodedImg = new TextDecoder('utf-8').decode(this.formRegistraArticulos.get('inputBinaryImg')?.value);
    const data: newArticule = {
      cantidad: this.formRegistraArticulos.get('cantidad')?.value,
      precio: this.formRegistraArticulos.get('costo')?.value,
      description: this.formRegistraArticulos.get('description')?.value,
      fotografia: decodedImg,
    }
    this.dataFormulario.emit(data);
  }

}


