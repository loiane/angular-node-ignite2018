import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Attendee } from '../model/attendee';

@Injectable({
  providedIn: 'root'
})
export class AttendeeGuard implements Resolve<Attendee> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Attendee | Observable<Attendee> | Promise<Attendee> {
    throw new Error('Method not implemented.');
  }
}
