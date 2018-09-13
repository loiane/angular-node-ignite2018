import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Attendee } from '../model/attendee';
import { AttendeesService } from '../services/attendees.service';

@Injectable({
  providedIn: 'root'
})
export class AttendeeGuard implements Resolve<Attendee> {

  constructor(private service: AttendeesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Attendee | Observable<Attendee> | Promise<Attendee> {

    if (route.params != null && route.params.id != null) {
      return this.service.loadById(route.params.id);
    }
    return of({
      _id: null,
      name: null,
      email: null
    });
  }
}
