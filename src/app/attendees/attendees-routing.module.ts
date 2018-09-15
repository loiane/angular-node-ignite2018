import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AttendeeFormComponent } from './components/attendee-form/attendee-form.component';
import { AttendeesComponent } from './containers/attendees/attendees.component';
import { AttendeeGuard } from './guards/attendee.guard';

const routes: Routes = [
  { path: '', component: AttendeesComponent },
  {
    path: 'new',
    component: AttendeeFormComponent,
    resolve: {
      attendee: AttendeeGuard
    }
  },
  {
    path: 'edit/:id',
    component: AttendeeFormComponent,
    resolve: {
      attendee: AttendeeGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendeesRoutingModule {}
