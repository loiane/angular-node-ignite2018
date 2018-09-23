import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Attendee } from '../../model/attendee';
import { Session } from '../../model/session';
import { AttendeesService } from '../../services/attendees.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-attendee-form',
  templateUrl: './attendee-form.component.html',
  styleUrls: ['./attendee-form.component.scss']
})
export class AttendeeFormComponent implements OnInit {

  form: FormGroup;
  sessions: any = [];
  sessionList$: Observable<Session[]>;
  matcher = new MyErrorStateMatcher();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private service: AttendeesService
  ) {}

  ngOnInit() {
    const attendee = this.route.snapshot.data['attendee'];

    this.form = this.formBuilder.group({
      _id: [attendee._id],
      name: [attendee.name, [Validators.required, Validators.maxLength(200)]],
      email: [attendee.email, [Validators.required, Validators.email]],
      sessions: this.formBuilder.array(this.retrieveSessions(attendee), Validators.required)
    });

    this.sessionList$ = this.service.listSessions();
  }

  getSessionFormArray() {
    return (<FormArray>this.form.get('sessions')).controls;
  }

  retrieveSessions(attendee: Attendee) {
    const sessions = [];
    if (attendee && attendee.sessions) {
      attendee.sessions.forEach(session => sessions.push(this.createSession(session)));
    } else {
      sessions.push(this.createSession());
    }
    return sessions;
  }

  createSession(session: Session = { name: null }): FormGroup {
    return this.formBuilder.group({
      name: [
        session.name,
        [Validators.required]
      ]
    });
  }

  addSession(): void {
    this.sessions = this.form.get('sessions') as FormArray;
    this.sessions.push(this.createSession());
  }

  isFieldRequired(field: string) {
    return this.form.get(field).hasError('required');
  }

  isEmailValid(field: string) {
    return this.form.get(field).hasError('email') && !this.form.get(field).hasError('required');
  }

  isFormArrayValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  isFieldRequiredArray(formControl: string, field: string, index: number) {
    const formArray = this.form.get(formControl) as FormArray;
    return formArray.controls[index].get(field).hasError('required');
  }

  verifyFieldLength(formControl: string, field: string, index: number) {
    const formArray = this.form.get(formControl) as FormArray;
    return formArray.controls[index].get(field).hasError('minlength') ||
    formArray.controls[index].get(field).hasError('maxlength');
  }

  getFormArrayClass(field: string) {
    return this.isFormArrayValid(field) ? 'form-array-color-error' : '' ;
  }

  /* markFieldTouched() {
    this.form.get('email').markAsTouched();
    this.form.get('name').markAsTouched();
    this.form.get('sessions').markAsTouched();
  } */

  validateAllFormFields(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        control.markAsTouched({ onlySelf: true });
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value)
        .subscribe(data => this.onCancel(), error => this.onError());
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  onError() {
    this.dialog.open(ErrorDialogComponent, {
      data: 'Error while trying to load data from server.'
    });
  }

  onCancel() {
    this.location.back();
  }

  displaySessionName(session?: Session) {
    return session ? session.name : undefined;
  }
}
