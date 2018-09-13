import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Attendee } from '../../model/attendee';

@Component({
  selector: 'app-attendee-dialog',
  templateUrl: './attendee-dialog.component.html',
  styles: []
})
export class AttendeeDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AttendeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Attendee
  ) { }

  ngOnInit() { }

  onClose() {
    this.dialogRef.close();
  }

}
