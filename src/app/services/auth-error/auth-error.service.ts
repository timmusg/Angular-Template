import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';

import { Error } from '../../models/error.model';

@Injectable()
export class AuthErrorService {
  errorOccured = new EventEmitter<Error>();

  handleError(error: any){
    if(error.error) {
      const errorData = new Error(error.title, error.error.message);
      this.errorOccured.emit(errorData);
    }
  }
}
