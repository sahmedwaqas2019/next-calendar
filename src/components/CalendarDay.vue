<template>
  <div class="day" @click="handleClick" :key="day.date" @drop="drop($event, day)" @dragover.prevent>
    {{ day.id }}
    <div v-if="day.event" class="event" draggable="true" @dragstart="drag($event, day)">
      {{ day.event.title }}
    </div>
  </div>
</template>

<script lang="ts">
import type { Day } from '@/interfaces/Calendar';

let draggedEvent: Day | null = null;
export default {
  props: ['day'],
  methods: {
    handleClick() {
      this.$emit('click', this.day);
    },
    drag(event: DragEvent, day: any) {
      draggedEvent = day;
    },
    drop(event: DragEvent, day: any) {
      if (draggedEvent) {
        this.$emit('drop', { from: draggedEvent, to: day });
        draggedEvent = null;
      }
    },
  }
};
</script>