<template>
  <div v-show="show" class="modal fade show" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" @click="close"></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button v-for="(button, index) in _buttons" :key="index" :class="['btn', button.class]" type="button"
            @click="button.action">
            {{ button.text }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Button } from '@/interfaces/Button';
export default {
  props: ['show', 'title', 'buttons', 'isEdit'],
  data() {
    return {
      defaultButtons: [
        { text: 'Save', action: this.save, class: 'btn btn-primary' },
        { text: 'Close', action: this.close, class: 'btn btn-secondary' },
      ],
      deleteButton: { text: 'Delete', action: this.delete, class: 'btn btn-danger' }
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    save() {
      this.$emit('save');
    },
    delete() {
      this.$emit('delete');
    }
  },
  computed: {
    _buttons(): Button[] {
      return this.buttons || (this.isEdit ? [...this.defaultButtons, this.deleteButton] : this.defaultButtons);
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-dialog {
  width: 100%;
  position: relative;
  margin: 0 auto;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 80%;
  max-width: 500px;
}

/* Transition styles */
.modal-enter-active,
.modal-leave-active {
  transition: opacity .5s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}

/* Transition styles */
/* Transition styles */
.modal-enter-active,
.modal-leave-active {
  transition: all 2.5s ease;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.modal-enter-to,
.modal-leave {
  opacity: 1;
  transform: translateY(0);
}

.modal-leave-active {
  transition: all 2.5s ease;
}

.modal-enter {
  transform: translateY(-100%);
}

.modal-leave-to {
  transform: translateY(100%);
}

.close {
  position: absolute;
  right: 10px;
  top: 10px;
  color: #000;
  border: 0;
}
</style>