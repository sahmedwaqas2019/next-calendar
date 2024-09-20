<template>
  <div class="week-days">
    <div v-for="day in weekDays" :key="day" class="day-name">
      {{ day }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['weekDays']
};
</script>