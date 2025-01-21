import { pino } from 'pino';

const logger = pino({
  level: 'trace',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

export default logger;
