import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

// @ts-ignore
@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
  /**
   *
   * @param dialogRef
   * @param data
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DeleteDialogComponent>) {
  }
}
