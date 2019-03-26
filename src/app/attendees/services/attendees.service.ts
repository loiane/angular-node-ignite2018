import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { Attendee } from '../model/attendee';
import { Session } from '../model/session';


@Injectable({
  providedIn: 'root'
})
export class AttendeesService {
  private readonly API = 'api/attendees';
  private readonly API_SESSION = 'api/sessions';

  private cache: Attendee[];
  private cacheSession: Session[];

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Attendee[]>(this.API).pipe(
      first(),
      tap(data => (this.cache = data))
    );
  }

  loadById(id: string) {
    if (this.cache != null && this.cache.length > 0) {
      const record = this.cache.find(attendee => `${attendee._id}` === `${id}`);
      return record != null ? of(record) : this.getById(id);
    }
    return this.getById(id);
  }

  private getById(id: string) {
    return this.http.get<Attendee>(`${this.API}/${id}`).pipe(first());
  }

  save(record: Attendee) {
    if (record._id != null) {
      return this.update(record);
    }
    return this.create(record);
  }

  private update(record: Attendee) {
    return this.http.put(`${this.API}/${record._id}`, record).pipe(first());
  }

  private create(record: Attendee) {
    return this.http.post<Attendee>(this.API, record).pipe(first());
  }

  remove(id: string) {
    return this.http.delete<Attendee>(`${this.API}/${id}`).pipe(first());
  }

  listSessions() {
    if (this.cacheSession != null) {
      return of(this.cacheSession);
    }
    return this.http.get<Session[]>(this.API_SESSION).pipe(
      first(),
      tap(data => (this.cacheSession = data))
    );
  }
}
