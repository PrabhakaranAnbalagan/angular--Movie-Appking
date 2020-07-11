import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  Success(title: string, message: string): any {
    return this.toastr.success(message, title);
  }
  Warning(title: string, message: string): any {
    return this.toastr.warning(message, title);
  }
  Info(title: string, message: string): any {
    return this.toastr.info(message, title);
  }
  Error(title: string, message: string): any {
    return this.toastr.error(message, title);
  }
}
