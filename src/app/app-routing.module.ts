import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'attendees', loadChildren: './attendees/attendees.module#AttendeesModule' },
  { path: '', pathMatch: 'full', redirectTo: 'attendees' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
