import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <h1>MS Ignite 2018</h1>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent { }
