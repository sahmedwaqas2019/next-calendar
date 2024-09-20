import { mount } from '@vue/test-utils'
import FullCalendar from '@/components/FullCalendar.vue';
import { describe, it, expect, beforeEach } from 'vitest'

describe('FullCalendar', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(FullCalendar);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  const event = { date: '2021-01-01', title: 'test' };
  it('emits event-add when event added is called', () => {
    wrapper.vm.selectEvent(event);
    wrapper.vm.addNewEvent();
    expect(wrapper.emitted('event-add')).toBeTruthy();
  });

  it('emits event-remove when eventRemoved is called', () => {
    wrapper.vm.selectEvent(event);
    wrapper.vm.removeEvent();
    expect(wrapper.emitted('event-remove')).toBeTruthy();
  });

  it('emits event-change when eventUpdated is called', () => {
    wrapper.vm.updateExistingEvent(event);
    expect(wrapper.emitted('event-change')).toBeTruthy();
  });

  it('get all events', () => {
    const events = [event];
    wrapper.vm.selectEvent(event);
    wrapper.vm.addNewEvent();
    expect(JSON.stringify(wrapper.vm.getAllEvents())).toEqual(JSON.stringify(events));
  });
});