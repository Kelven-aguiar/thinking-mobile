import React, { createContext, useContext } from 'react';
import { CalendarEventsType, customEvents } from '../data/DataDay';

const CalendarEventsContext = createContext<CalendarEventsType>(customEvents);

export const CalendarEventsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <CalendarEventsContext.Provider value={customEvents}>
      {children}
    </CalendarEventsContext.Provider>
  );
};

export const useCalendarEvents = () => useContext(CalendarEventsContext);
