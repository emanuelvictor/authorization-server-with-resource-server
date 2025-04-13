import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DeleteDialogComponent} from '../../application/controls/delete-dialog/delete-dialog.component';

@Injectable()
export class DialogService {

  /**
   *
   * @param dialog
   */
  constructor(public dialog: MatDialog) {
  }

  /**
   *
   * @param entity
   * @param type
   */
  public confirmDelete(entity: any, type: string): Promise<any> {
    return this.dialog.open(DeleteDialogComponent, {
      width: '325px',
      height: 'auto',
      data: {entity, type}
    })
      .afterClosed()
      .toPromise()
  }
}
