import fs from 'fs';
import path from 'path';

const logFile = path.join(process.cwd(), 'logs', 'app.log');

// Ensure logs directory exists
if (!fs.existsSync(path.dirname(logFile))) {
  fs.mkdirSync(path.dirname(logFile), { recursive: true });
}

const log = (level, message, ...args) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message} ${args.length ? JSON.stringify(args) : ''}\n`;

  // Console log
  console.log(`[${level.toUpperCase()}] ${message}`, ...args);

  // File log
  fs.appendFileSync(logFile, logMessage);
};

export const logger = {
  info: (message, ...args) => log('info', message, ...args),
  warn: (message, ...args) => log('warn', message, ...args),
  error: (message, ...args) => log('error', message, ...args),
  debug: (message, ...args) => log('debug', message, ...args),
};