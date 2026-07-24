import type { LogType, LoggerCreateData, LogConfig } from "../types/logger.type.js";
import {
    createLoggerDependencies,
    defaultCreateLogDataDependencies,
} from "../dependencies/logger-dependencies.js";
import type { LoggerCreateLogDataDependencies } from "../types/logger-dependencies.type.js";

export function createLogData(
    type: LogType,
    message: string,
    label: string,
    config?: LogConfig,
    dependencies: Partial<LoggerCreateLogDataDependencies> = {}
): LoggerCreateData {
    const deps = createLoggerDependencies<LoggerCreateLogDataDependencies>(
        defaultCreateLogDataDependencies,
        dependencies
    );

    const messageLabel = config?.labelHidden ? "" : `[${type}] `;
    const createMessageLabel = config?.labelHidden ? "" : `${label} `;

    return {
        type,
        message: `${messageLabel}${message}`,
        createMessage: `${createMessageLabel}${message}`,
        date: deps.date.now(),
    };
}
