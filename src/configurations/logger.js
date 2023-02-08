require('dotenv').config();
const { createLogger, format, transports } = require('winston');

const { NODE_ENV } = process.env;

const enumerateErrorFormat = format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }

  return info;
});

const logger = createLogger({
  level: NODE_ENV === 'development' ? 'info' : 'info',
  format: format.combine(
    enumerateErrorFormat(),
    NODE_ENV === 'development' ? format.colorize() : format.uncolorize(),
    format.splat(),
    format.printf(({ level, message }) => `${level}: ${message}`),
  ),
  transports: [
    new transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

module.exports = logger;
