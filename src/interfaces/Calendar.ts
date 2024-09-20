export interface Event {
  date: string;
  title: string;
}
export interface Day {
  id: number | string;
  date: string;
  event?: Event;
}
export interface Week {
  id: number;
  days: Day[];
}

export interface Calendar {
  currentMonth: number,
  currentYear: number,
  weekDays: string[],
  events: Event[],
  title: string,
  monthNames: string[],
  selectedEvent: Event | null
}

export interface DraggableEvent {
  from: Day,
  to: Day
}