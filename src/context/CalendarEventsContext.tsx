import React, { createContext, useCallback, useContext, useState } from 'react';
import {
  addPing as addPingUtil,
  getPingsForDate,
  removePing as removePingUtil,
  updatePing as updatePingUtil,
} from '../data/pingUtils';
import type { CalendarEventsType, Ping } from '../utils/DataDay';
import { customEvents } from '../utils/DataDay';

interface CalendarEventsContextType {
  events: CalendarEventsType;
  addPing: (dateString: string, ping: Omit<Ping, 'id' | 'timestamp'>) => void;
  removePing: (dateString: string, pingId: string) => void;
  updatePing: (
    dateString: string,
    pingId: string,
    updates: Partial<Omit<Ping, 'id'>>
  ) => void;
  getPings: (dateString: string) => Ping[];
}

const CalendarEventsContext = createContext<
  CalendarEventsContextType | undefined
>(undefined);

export const CalendarEventsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [events, setEvents] = useState<CalendarEventsType>(customEvents);

  const addPing = useCallback(
    (dateString: string, ping: Omit<Ping, 'id' | 'timestamp'>) => {
      setEvents((prevEvents) => addPingUtil(prevEvents, dateString, ping));
    },
    []
  );

  const removePing = useCallback((dateString: string, pingId: string) => {
    setEvents((prevEvents) => removePingUtil(prevEvents, dateString, pingId));
  }, []);

  const updatePing = useCallback(
    (
      dateString: string,
      pingId: string,
      updates: Partial<Omit<Ping, 'id'>>
    ) => {
      setEvents((prevEvents) =>
        updatePingUtil(prevEvents, dateString, pingId, updates)
      );
    },
    []
  );

  const getPings = useCallback(
    (dateString: string) => {
      return getPingsForDate(events, dateString);
    },
    [events]
  );

  const value = React.useMemo(
    () => ({
      events,
      addPing,
      removePing,
      updatePing,
      getPings,
    }),
    [events, addPing, removePing, updatePing, getPings]
  );

  return (
    <CalendarEventsContext.Provider value={value}>
      {children}
    </CalendarEventsContext.Provider>
  );
};

export const useCalendarEvents = () => {
  const context = useContext(CalendarEventsContext);
  if (context === undefined) {
    throw new Error(
      'useCalendarEvents must be used within a CalendarEventsProvider'
    );
  }
  return context;
};
