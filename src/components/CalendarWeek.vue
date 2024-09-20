<template>
  <div class="week">
    <CalendarDay v-for="day in week.days" :key="day.date" :day="day" @click="handleDayClick(day)" @drop="handleDrop" />
  </div>
</template>

<script lang="ts">
import CalendarDay from '@/components/CalendarDay.vue';
import type { Day } from '@/interfaces/Calendar';

export default {
  components: {
    CalendarDay
  },
  props: ['week'],
  methods: {
    handleDayClick(day: Day) {
      this.$emit('dayClick', day);
    },
    handleDrop(data: { from: Day, to: Day }) {
      this.$emit('dayDrop', data);
    }
  }
};
</script>