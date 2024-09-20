<template>
  <FullCalendar ref="fullCalendar" @event-add="eventAdded" @event-remove="eventRemoved" @event-change="eventUpdated" />
  <div class="mt-3">
    <textarea class="form-control" rows="5" readonly :value="prettyEvents"></textarea>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import FullCalendar from '@/components/FullCalendar.vue';
import { type Event } from '@/interfaces/Calendar';
import { EventService } from '@/services/EventService';

export default {
  components: {
    FullCalendar
  },
  setup() {
    const fullCalendar = ref<InstanceType<typeof FullCalendar> | null>(null);
    const prettyEvents = computed(() => JSON.stringify(fullCalendar.value?.getAllEvents()));

    return {
      fullCalendar,
      prettyEvents
    }
  },
  methods: {
    eventAdded(event: Event) {
      EventService.post(event)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
    },
    eventRemoved(event: Event) {
      EventService.delete(event)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
    },
    eventUpdated(event: Event) {
      EventService.put(event)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
