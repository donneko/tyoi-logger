import type {
    LogType,
    LoggerCreateData,
    LogConfig,
    LoggerDependencies,
} from "../types/logger.type.js";
import { defaultLoggerDependencies } from "../deps/logger-dependencies.js";

export function createLogData(
    type: LogType,
    message: string,
    label: string,
    config?: LogConfig,
    dependencies: Partial<LoggerDependencies> = {}
): LoggerCreateData {
    const deps = {
        ...defaultLoggerDependencies(),
        ...dependencies,
    } as LoggerDependencies;

    const messageLabel = config?.labelHidden ? "" : `[${type}] `;
    const createMessageLabel = config?.labelHidden ? "" : `${label} `;

    return {
        type,
        message: `${messageLabel}${message}`,
        createMessage: `${createMessageLabel}${message}`,
        date: deps.date.now(),
    };
}
