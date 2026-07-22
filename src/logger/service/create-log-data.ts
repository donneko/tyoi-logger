import type {
    LogType,
    LoggerCreateData,
    LogConfig,
    LoggerDependencies,
} from "../types/logger.type.js";
import { createLoggerDeps } from "../deps/create-logger-deps.js";

export function createLogData(
    type: LogType,
    message: string,
    label: string,
    config?: LogConfig,
    dependencies: Partial<LoggerDependencies> = {}
): LoggerCreateData {
    const deps = createLoggerDeps(dependencies);

    const messageLabel = config?.labelHidden ? "" : `[${type}] `;
    const createMessageLabel = config?.labelHidden ? "" : `${label} `;

    return {
        type,
        message: `${messageLabel}${message}`,
        createMessage: `${createMessageLabel}${message}`,
        date: deps.date.now(),
    };
}
