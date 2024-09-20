<template>
  <div class="fullcalendar">
    <CalendarHeader :currentMonth="currentMonth" :currentYear="currentYear" :monthNames="monthNames"
      @nextMonth="nextMonth" @prevMonth="prevMonth" @changeMonth="changeMonth" @changeYear="changeYear" />
    <WeekDays :weekDays="weekDays" />
    <CalendarWeek v-for="week in weeks" :key="week.id" :week="week" @dayClick="handleDayClick" @dayDrop="handleDayDrop" />
    <EventModal :isEdit="title.includes('Edit')" :selectedEvent="selectedEvent" :currentMonth="currentMonth"
      :currentYear="currentYear" :title="title" @close="close" @updateEvent="updateEvent" @deleteEvent="deleteEvent" />
  </div>
</template>

<script lang="ts">
import CalendarHeader from '@/components/CalendarHeader.vue';
import WeekDays from '@/components/WeekDays.vue';
import EventModal from '@/components/EventModal.vue';
import CalendarWeek from '@/components/CalendarWeek.vue';
import { weekDays } from '@/const/Weekdays';
import { Months } from '@/const/Months';
import type { Event, Day, Calendar, DraggableEvent } from '@/interfaces/Calendar';
import { generateWeeks } from '@/utils/weeks'



export default {
  components: {
    CalendarHeader,
    WeekDays,
    EventModal,
    CalendarWeek
  },
  props: ['initialEvents'],
  data(): Calendar {
    return {
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      weekDays: weekDays,
      events: [],
      title: '',
      monthNames: Months,
      selectedEvent: null,
    };
  },
  created() {
    this.events = this.initialEvents || [];
  },
  computed: {
    weeks() {
      return generateWeeks(this.currentYear, this.currentMonth, this.events);
    },
  },
  methods: {
    handleDayDrop(data: DraggableEvent) {
      if (this.hasFromAndToProperties(data)) {
        this.moveEvent(data);
      }
    },
    hasFromAndToProperties(data: DraggableEvent) {
      return Object.prototype.hasOwnProperty.call(data, 'from') && Object.prototype.hasOwnProperty.call(data, 'to');
    },
    moveEvent(data: DraggableEvent) {
      const fromIndex = this.findEventIndex(data.from.date);
      const toIndex = this.findEventIndex(data.to.date);

      if (toIndex === -1) {
        this.addEvent(data.from.event!, data.to.date);
        this.removeEvent(fromIndex);
      }
    },
    findEventIndex(date: string) {
      return this.events.findIndex((e: Event) => e.date === date);
    },
    addEvent(event: Event, date: string) {
      this.events.push({ ...event, date } as Event);
    },
    removeEvent(index: number) {
      this.$emit('event-remove', this.events[index]);
      this.events.splice(index, 1);
    },
    handleDayClick(day: Day) {
      if (day.date) {
        this.title = day.event ? 'Edit Event' : 'Add Event';
        this.selectedEvent = day.event ? { ...day.event } : { date: day.date, title: '' };
      }
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear += 1;
      } else {
        this.currentMonth += 1;
      }
    },
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear -= 1;
      } else {
        this.currentMonth -= 1;
      }
    },
    changeMonth(month: number) {
      this.currentMonth = month;
    },
    changeYear(year: number) {
      this.currentYear = year;
    },
    selectEvent(event: Event) {
      this.selectedEvent = event;
    },
    close() {
      this.selectedEvent = null;
    },
    updateEvent() {
      if (!this.selectedEvent) {
        return;
      }
      const event = this.findEventByDate(this.selectedEvent.date);
      event ? this.updateExistingEvent(event) : this.addNewEvent();
      this.close();
    },
    findEventByDate(date: string) {
      return this.events.find(e => e.date === date);
    },
    updateExistingEvent(event: Event) {
      event.title = this.selectedEvent?.title as string;
      this.$emit('event-change', event);
    },
    addNewEvent() {
      this.events.push(this.selectedEvent as Event);
      this.$emit('event-add', this.selectedEvent);
    },
    getAllEvents() {
      return this.events;
    },
    deleteEvent() {
      if (!this.selectedEvent) {
        return;
      }
      const index = this.findEventIndex(this.selectedEvent.date);
      this.removeEvent(index);
      this.close();
    }
  },
};
</script>

<style>
.fullcalendar * {
  color: #000;
}

.fullcalendar {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

}

.week-days,
.button {
  display: flex;
}

.week {
  display: flex;
  border-top: 1px solid #ddd;
}

.day-name {
  width: 14.28%;
  height: 50px;
  border-right: 1px solid #ddd;
  padding: 10px;
  color: #000;
  text-align: right;
  background-color: #f9f9f9;
}

.day {
  width: 14.28%;
  height: 100px;
  border-right: 1px solid #ddd;
  padding: 10px;
  color: #000;
  text-align: right;
  background-color: #f9f9f9;
}

.day:last-child {
  border-right: none;
}

.event {
  background-color: #3788d8;
  border-radius: 5px;
  padding: 5px;
  margin-top: 5px;
  color: #fff;
  font-size: 0.8em;
}

.button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.button button {
  background-color: #3788d8;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.button button:hover {
  background-color: #2c6fb7;
}
</style>