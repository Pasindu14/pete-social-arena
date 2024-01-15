import winston from "winston";

const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    // File transport
    new winston.transports.File({ filename: "logs/error.log" }),
    // Console transport
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

// Function to log error
export function logError(err: any) {
  logger.error(err);
}

// Example usage
try {
  // Some code that might throw an error
} catch (error) {
  logError(error);
}
