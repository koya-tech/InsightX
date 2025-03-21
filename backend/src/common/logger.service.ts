import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as moment from 'moment-timezone';

@Injectable()
export class CustomLoggerService implements LoggerService {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: () => moment().tz('America/Los_Angeles').format('YYYY-MM-DD HH:mm:ss'),
                }),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${timestamp as string} [${level.toUpperCase()}]: ${message as string}`;
                }),
            ),
            transports: [
                new winston.transports.File({
                    filename: 'logs/application.log',
                    maxsize: 5 * 1024 * 1024, // 5MB
                    maxFiles: 3,
                    tailable: true, // 最新のログを application.log に維持
                }),
            ],
        });
    }

    log(message: string) {
        this.logger.info(message);
    }

    error(message: string, trace?: string) {
        this.logger.error(`${message} - ${trace}`);
    }

    warn(message: string) {
        this.logger.warn(message);
    }

    debug(message: string) {
        this.logger.debug(message);
    }

    verbose(message: string) {
        this.logger.verbose(message);
    }

    nestLog(message: string, context?: string) {
        this.logger.info(`[Nest] ${context ? `[${context}] ` : ''}${message}`);
    }
}
