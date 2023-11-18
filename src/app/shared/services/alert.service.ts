import { Injectable } from '@angular/core';

import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class AlertService {

  public alertaError(titleAlert: string, tipoIcon: SweetAlertIcon): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: true,
      confirmButtonText: 'OK',
      timer: 4000,
      timerProgressBar: true,
      didOpen: (Toast) => {
        Toast.onmouseenter = Swal.stopTimer;
        Toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: tipoIcon,
      title: titleAlert
    });
  }

  public alertResponseRequest(titleAlert: string, message: string, tipoIcon: SweetAlertIcon): void {
    Swal.fire({
      icon: tipoIcon,
      title: titleAlert,
      text: message,
    });
  }

  public async alertConfirmAction(titleAlert: string, message: string): Promise<Boolean> {
    const result = await Swal.fire({
      title: titleAlert,
      text: message,
      icon: 'question',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    });
    return result.isConfirmed;
  }

}
