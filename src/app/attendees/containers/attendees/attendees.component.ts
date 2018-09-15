import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { AttendeeDialogComponent } from '../../components/attendee-dialog/attendee-dialog.component';
import { Attendee } from '../../model/attendee';
import { AttendeesService } from '../../services/attendees.service';

@Component({
  selector: 'app-attendees',
  templateUrl: './attendees.component.html',
  styles: [
    `
      .example-container {
        display: flex;
        flex-direction: column;
        min-width: 300px;
      }
    `,
    `
      .example-loading-shade {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 56px;
        right: 0;
        background: rgba(0, 0, 0, 0.15);
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `
  ]
})
export class AttendeesComponent implements OnInit {
  attendees$: Observable<Attendee[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private attendeesService: AttendeesService
  ) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.attendees$ = this.attendeesService.list().pipe(
      catchError(error => {
        this.onError('Error while trying to load the information.');
        return of([]);
      })
    );
  }

  onError(message: String) {
    this.dialog.open(ErrorDialogComponent, {
      data: message
    });
  }

  onDetails(record: Attendee) {
    this.dialog.open(AttendeeDialogComponent, {
      data: record
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(record: Attendee) {
    this.router.navigate(['edit', record._id], { relativeTo: this.route });
  }

  onRemove(record: Attendee) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Are you sure you want to delete this record?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.attendeesService.remove(record._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Record removed successfully!', 'X', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error => this.onError('Error while trying to delete the record.')
        );
      }
    });
  }
}
