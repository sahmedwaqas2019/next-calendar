<template>
  <div class="button">
    <button class="prev btn btn-default" @click="prevMonth">Previous</button>
    <h4 class="month">{{ monthNames[currentMonth] }} {{ currentYear }}</h4>
    <div class="month px-0">
      <div class="row">
        <div class="col-8 px-1">
          <select class="form-control pl-2 pr-2" v-model="_month" @change="changeMonth">
            <option v-for="(month, index) in monthNames" :key="index" :value="index">{{ month }}</option>
          </select>
        </div>
        <div class="col-4 px-0">
          <select class="form-control pl-2 pr-2" v-model="_year" @change="changeYear">
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
      </div>
    </div>
    <button class="btn btn-default next" @click="nextMonth">Next</button>
  </div>
</template>

<script lang="ts">
export default {
  props: ['currentMonth', 'currentYear', 'monthNames'],
  computed: {
    years() {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 23 }, (_, i) => currentYear + i - 11);

    },
    // set and get for month and year
    _month: {
      get() {
        return this.currentMonth;
      },
      set(value: string) {
        this.$emit('changeMonth', value);
      }
    },
    _year: {
      get() {
        return this.currentYear;
      },
      set(value: string) {
        this.$emit('changeYear', value);
      }
    }
    // _month() {
    //   return this.currentMonth;
    // },
    // _year() {
    //   return this.currentYear;
    // }
  },
  methods: {
    nextMonth() {
      this.$emit('nextMonth');
    },
    prevMonth() {
      this.$emit('prevMonth');
    },
    changeMonth() {
      this.$emit('changeMonth', this._month);
    },
    changeYear() {
      console.log(this._year);
      this.$emit('changeYear', this._year);
    }
  }
};
</script>