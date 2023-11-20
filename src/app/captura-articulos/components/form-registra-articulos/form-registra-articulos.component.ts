import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { newArticule } from 'src/app/interfaces/formNewArticule.interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';

import { Storage, ref, uploadBytes, getDownloadURL, listAll, ListResult } from '@angular/fire/storage';

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
    img: ['', [Validators.required] ],
  });
  public urlImagenes: string[] = [];
  public sanitizedImageUrl: SafeUrl = '';
  public isLoading: boolean = false;

  constructor (
    private fb: FormBuilder,
    private alertService: AlertService,
    private storage: Storage,
    private sanitizer: DomSanitizer
  ) { }

  public activaInput(): void{
    this.fileInput.nativeElement.click();
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
    this.formRegistraArticulos.reset({cantidad: '', costo: '', description: '', inputImgUploading: null, img: ''});
    this.sanitizedImageUrl = '';
  }

  public uploadImg($event: any) {
    this.isLoading = true;
    const imgFile = $event.target.files[0];
    const fileNameWithExtension: string = imgFile.name;
    const fileNameWithoutExtension: string = fileNameWithExtension.split('.')[0];
    const imgRef = ref(this.storage, `/imgArticles/article/${fileNameWithoutExtension}/${fileNameWithoutExtension}`)

    uploadBytes(imgRef, imgFile).then(respuesta => {
      this.obtenerUrl(fileNameWithoutExtension);
    }).catch(() => {
      this.isLoading = false;
      this.alertService.alertaError('Se produjo un erro al subir la imagen', 'error');
    });
  }

  public obtenerUrl(nameImg: string) {
    const imgRef = ref(this.storage, `/imgArticles/article/${nameImg}/`)
    listAll(imgRef).then(async imagenes => {
      for (let item of imagenes.items) {
        const urlImagen = await getDownloadURL(item);
        this.sanitizedImageUrl = this.sanitizer.bypassSecurityTrustUrl(urlImagen);
        this.formRegistraArticulos.patchValue({
          img: urlImagen,
        });
        this.isLoading = false;
      }
    }).catch(() => {
      this.isLoading = false;
      this.alertService.alertaError('Se produjo un erro al obtener la direccion url de la imagen', 'error');
    });
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

  private mandarForm(): void{
    const data: newArticule = {
      cantidad: this.formRegistraArticulos.get('cantidad')?.value,
      precio: this.formRegistraArticulos.get('costo')?.value,
      description: this.formRegistraArticulos.get('description')?.value,
      fotografia: this.formRegistraArticulos.get('img')?.value,
    }
    this.dataFormulario.emit(data);
    this.limpiaFormulario();
  }

}


