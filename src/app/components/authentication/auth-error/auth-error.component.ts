import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Error } from '../../../models/error.model';
import { AuthErrorService } from '../../../services/auth-error/auth-error.service';

@Component({
  selector: 'app-auth-error',
  template: ``
})
export class AuthErrorComponent implements OnInit {
  error: Error;

  constructor(
    private errorService: AuthErrorService,
    public dialog: MatDialog
  ) { }

  openDialog(data) {
    let dialogRef = this.dialog.open(AuthErrorDialog, { data });
  }

  ngOnInit() {
    this.errorService.errorOccured
    .subscribe((error: Error) => {
      this.error = error;
      this.openDialog(this.error);
    })
  }
}

@Component({
  selector: 'auth-error-dialog',
  templateUrl: 'auth-error-dialog.html',
  styleUrls: ['./auth-error-dialog.css']
})

  export class AuthErrorDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
