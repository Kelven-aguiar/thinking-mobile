# Thinking Mobile

Thinking Mobile é um aplicativo para registro de pensamentos, tarefas e eventos diários, com visualização em calendário. O objetivo é permitir que o usuário registre notas em cada dia, visualizando facilmente os dias com registros através de indicadores visuais (pings) no calendário.

## Funcionalidades
- Visualização de calendário customizado
- Indicação visual (ping) nos dias com registros
- Registro de notas por dia (simulado no frontend)
- Interface moderna e responsiva
- Preparado para integração futura com backend e autenticação de usuários

## Tecnologias Utilizadas
- React Native
- Expo
- TypeScript
- react-native-calendars
- Tailwind CSS (via NativeWind)
- ESLint/Biome para qualidade de código

## Como funciona
O usuário poderá, em versões futuras, abrir um modal para escrever uma nota. O dia com nota registrada será marcado com um ping vermelho no calendário. Atualmente, os dados são simulados no frontend para facilitar testes e desenvolvimento.

## Estrutura do Projeto
- `app/components/calendar/CustomCalendar.tsx`: Componente de calendário customizado
- `app/components/calendar/CustomDay.tsx`: Renderização customizada de cada dia
- `app/data/DataDay.tsx`: Simulação de dados dos dias com registros
- `app/index.tsx`: Tela principal do app

## Como rodar
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o projeto:
   ```bash
   npx expo start
   ```

## Futuro
- Integração com backend para autenticação e armazenamento dos registros
- Modal para escrita de notas
- Sincronização multi-dispositivo

---

Desenvolvido por Kelven Aguiar.
