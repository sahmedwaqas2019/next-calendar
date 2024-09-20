<!-- eslint-disable vue/no-mutating-props -->
<template>
  <Modal v-if="selectedEvent" @close="close" @delete="deleteEvent" @save="updateEvent" :show="selectedEvent"
    :title="title">
    <form class="form" @submit.prevent="updateEvent">
      <div class="form-group p-3">
        <label>Date</label>
        <span class="form-control">{{ `${selectedEvent.date}` }}</span>
      </div>
      <div class="form-group p-3">
        <label>Title</label>
        <input type="text" class="form-control" :class="{ 'is-invalid': titleError }" placeholder="Title"
          v-model="selectedEvent.title" required @input="validateTitle" />
        <div v-if="titleError" class="invalid-feedback">{{ titleError }}</div>
      </div>
    </form>
  </Modal>
</template>

<script lang="ts">
import Modal from '@/components/CustomModal.vue';

export default {
  components: {
    Modal
  },
  data() {
    return {
      titleError: ''
    };
  },
  props: ['selectedEvent', 'currentMonth', 'currentYear', 'title'],
  methods: {
    close() {
      this.titleError = '';
      this.$emit('close');
    },
    validateTitle() {
      if (!this.selectedEvent.title || this.selectedEvent.title.length < 3 || this.selectedEvent.title.length > 15) {
        this.titleError = 'Title must be between 3 and 15 characters';
      } else {
        this.titleError = '';
      }
    },
    updateEvent() {
      this.validateTitle();
      if (!this.titleError) {
        this.$emit('updateEvent');
      }
    },
    deleteEvent() {
      this.$emit('deleteEvent');
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
  font-size: small;
  font-weight: bold;
}
</style>