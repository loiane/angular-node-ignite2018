import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Attendee } from '../model/attendee';
import { first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AttendeesService {
  private readonly API = 'api/attendees';
  private cache: Attendee[];

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
}
