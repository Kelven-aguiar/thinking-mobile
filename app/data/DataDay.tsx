export type Ping = {
  id: string;
  color: string;
  hour: number; // 0-23
  minute?: number; // 0-59 (opcional para maior precisão)
  timestamp: number; // Unix timestamp para ordenação
  annotation?: string; // Anotação opcional associada ao ping
  metadata?: Record<string, unknown>; // Dados adicionais flexíveis
};

export type CalendarEvent = {
  pings?: Ping[];
  today?: boolean;
  pingColor?: string;
  pingHour?: number;
  annotation?: string;
};

export type CalendarEventsType = {
  [date: string]: CalendarEvent;
};

// Exemplo com múltiplos pings - Dados da semana atual
export const customEvents: CalendarEventsType = {
  // Dia atual do sistema
  '2025-10-30': {
    today: true,
    pings: [
      {
        id: '1',
        color: '#ef4444', // red-500
        hour: 8,
        minute: 0,
        timestamp: Date.now() - 10000,
        annotation: 'Fiquei feliz',
      },
      {
        id: '2',
        color: '#3b82f6', // blue-500
        hour: 13,
        minute: 15,
        timestamp: Date.now() - 5000,
        annotation: 'Fiquei triste',
      },
      {
        id: '3',
        color: '#22c55e', // green-500
        hour: 17,
        minute: 45,
        timestamp: Date.now(),
        annotation: 'Fiquei normal',
      },
    ],
  },
};
