import type { Event } from "@/interfaces/Calendar";
import { get, post, del, put } from "./HttpService";

export class EventService {
  static put(event: Event) {
    return put('/api/event/update', event);
  }
  static post(event: Event) {
    return post('/api/event/add', event);
  }
  static delete(event: Event) {
    return del(`/api/event/${event.date}`);
  }
  static get(date: string) {
    return get(`/api/event/${date}`);
  }
}