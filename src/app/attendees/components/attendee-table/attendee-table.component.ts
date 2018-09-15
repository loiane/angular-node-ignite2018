import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Attendee } from '../../model/attendee';

@Component({
  selector: 'app-attendee-table',
  templateUrl: './attendee-table.component.html',
  styleUrls: ['./attendee-table.component.scss']
})
export class AttendeeTableComponent implements OnInit {

  @Input() attendees: Attendee[];
  @Output() details: EventEmitter<Attendee> = new EventEmitter(false);
  @Output() edit: EventEmitter<Attendee> = new EventEmitter(false);
  @Output() remove: EventEmitter<Attendee> = new EventEmitter(false);
  @Output() add: EventEmitter<any> = new EventEmitter(false);

  displayedColumns = ['name', 'email', 'actions'];

  constructor() { }

  ngOnInit() { }

  onDetails(record: Attendee) {
    this.details.emit(record);
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(record: Attendee) {
    this.edit.emit(record);
  }

  onRemove(record: Attendee) {
    this.remove.emit(record);
  }

}
