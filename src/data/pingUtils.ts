import type { CalendarEventsType, Ping } from '../utils/DataDay';

/**
 * Gera um ID único para um ping
 */
export const generatePingId = (): string => {
  return `ping_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Adiciona um ping a uma data específica
 */
export const addPing = (
  events: CalendarEventsType,
  dateString: string,
  ping: Omit<Ping, 'id' | 'timestamp'>
): CalendarEventsType => {
  const existingEvent = events[dateString] || {};
  const existingPings = existingEvent.pings || [];

  const newPing: Ping = {
    ...ping,
    id: generatePingId(),
    timestamp: Date.now(),
  };

  return {
    ...events,
    [dateString]: {
      ...existingEvent,
      pings: [...existingPings, newPing],
    },
  };
};

/**
 * Remove um ping específico de uma data
 */
export const removePing = (
  events: CalendarEventsType,
  dateString: string,
  pingId: string
): CalendarEventsType => {
  const existingEvent = events[dateString];
  if (!existingEvent || !existingEvent.pings) {
    return events;
  }

  const updatedPings = existingEvent.pings.filter((ping) => ping.id !== pingId);

  // Se não houver mais pings, remover a entrada ou manter apenas as outras propriedades
  if (updatedPings.length === 0) {
    const { pings: _pings, ...restEvent } = existingEvent;
    if (Object.keys(restEvent).length === 0) {
      const { [dateString]: _, ...restEvents } = events;
      return restEvents;
    }
    return {
      ...events,
      [dateString]: restEvent,
    };
  }

  return {
    ...events,
    [dateString]: {
      ...existingEvent,
      pings: updatedPings,
    },
  };
};

/**
 * Atualiza um ping específico
 */
export const updatePing = (
  events: CalendarEventsType,
  dateString: string,
  pingId: string,
  updates: Partial<Omit<Ping, 'id'>>
): CalendarEventsType => {
  const existingEvent = events[dateString];
  if (!existingEvent || !existingEvent.pings) {
    return events;
  }

  const updatedPings = existingEvent.pings.map((ping) =>
    ping.id === pingId ? { ...ping, ...updates } : ping
  );

  return {
    ...events,
    [dateString]: {
      ...existingEvent,
      pings: updatedPings,
    },
  };
};

/**
 * Obtém todos os pings de uma data, ordenados por timestamp
 */
export const getPingsForDate = (
  events: CalendarEventsType,
  dateString: string
): Ping[] => {
  const event = events[dateString];
  if (!event || !event.pings) {
    return [];
  }

  return [...event.pings].sort((a, b) => a.timestamp - b.timestamp);
};

/**
 * Obtém o total de pings em um intervalo de datas
 */
export const getPingsCount = (
  events: CalendarEventsType,
  startDate?: string,
  endDate?: string
): number => {
  if (!startDate && !endDate) {
    // Contar todos os pings
    return Object.values(events).reduce(
      (total, event) => total + (event.pings?.length || 0),
      0
    );
  }

  // Contar pings em um intervalo específico
  return Object.entries(events)
    .filter(([date]) => {
      if (startDate && date < startDate) return false;
      if (endDate && date > endDate) return false;
      return true;
    })
    .reduce((total, [, event]) => total + (event.pings?.length || 0), 0);
};

/**
 * Agrupa pings por hora para análise
 */
export const groupPingsByHour = (
  events: CalendarEventsType,
  dateString?: string
): Record<number, Ping[]> => {
  const pingsToGroup = dateString
    ? getPingsForDate(events, dateString)
    : Object.values(events).flatMap((event) => event.pings || []);

  return pingsToGroup.reduce(
    (acc, ping) => {
      const hour = ping.hour;
      if (!acc[hour]) {
        acc[hour] = [];
      }
      acc[hour].push(ping);
      return acc;
    },
    {} as Record<number, Ping[]>
  );
};

/**
 * Filtra pings por cor
 */
export const filterPingsByColor = (
  events: CalendarEventsType,
  color: string
): CalendarEventsType => {
  const filtered: CalendarEventsType = {};

  Object.entries(events).forEach(([date, event]) => {
    if (!event.pings) return;

    const matchingPings = event.pings.filter((ping) => ping.color === color);
    if (matchingPings.length > 0) {
      filtered[date] = {
        ...event,
        pings: matchingPings,
      };
    }
  });

  return filtered;
};

/**
 * Valida se um ping tem dados válidos
 */
export const isValidPing = (ping: Partial<Ping>): boolean => {
  return (
    typeof ping.color === 'string' &&
    ping.color.length > 0 &&
    typeof ping.hour === 'number' &&
    ping.hour >= 0 &&
    ping.hour <= 23 &&
    (ping.minute === undefined ||
      (typeof ping.minute === 'number' &&
        ping.minute >= 0 &&
        ping.minute <= 59))
  );
};
