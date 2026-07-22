import type { LoggerCreateData } from "../types/logger.type.js";
import { createLoggerDependencies } from "../deps/create-logger-deps.js";
import { defaultLogSelectDependencies } from "../deps/logger-dependencies.js";
import type { LoggerLogSelectDependencies } from "../types/logger-dependencies.type.js";

export function logSelectProcess(
    logData: LoggerCreateData,
    dependencies: Partial<LoggerLogSelectDependencies> = {}
) {
    const deps = createLoggerDependencies<LoggerLogSelectDependencies>(
        defaultLogSelectDependencies,
        dependencies
    );

    if (deps.isTTY) {
        const message = logData.createMessage;

        deps.writeStderr(message);
    } else {
        deps.writeStdout(logData);
    }
}
