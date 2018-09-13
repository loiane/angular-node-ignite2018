import { Session } from './session';

export interface Attendee {
  _id: string;
  name: string;
  email: string;
  session?: Session[];
}
