import type { Week, Event } from "@/interfaces/Calendar";

export function generateWeeks(currentYear: number, currentMonth: number, events: Event[]) {
  const weeks = [];
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  let dayCount = 1;
  for (let i = 0; i < 5; i++) {
    const week: Week = { id: i, days: [] };
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDay) || dayCount > totalDays) {
        week.days.push({
          id: '',
          date: ""
        });
      } else {
        const date = new Date(currentYear, currentMonth, dayCount);
        const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const event = events.find((e: Event) => e.date === formattedDate);
        const day = { id: dayCount++, date: formattedDate, event };
        week.days.push(day);
      }
    }
    weeks.push(week);
  }

  return weeks;
}