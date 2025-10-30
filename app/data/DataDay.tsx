export type CalendarEvent = {
  hasPing?: boolean;
  pingColor?: string;
  marked?: boolean;
  pingHour?: number;
};

export type CalendarEventsType = {
  [date: string]: CalendarEvent;
};

export const customEvents: CalendarEventsType = {
  '2025-10-30': {
    hasPing: true,
    pingColor: 'red',
    marked: true,
    pingHour: 0,
  },
};
