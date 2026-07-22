import type { LoggerCreateData, LoggerDependencies } from "../types/logger.type.js";
import { createLoggerDeps } from "../deps/create-logger-deps.js";

export function logSelectProcess(
    logData: LoggerCreateData,
    dependencies: Partial<LoggerDependencies> = {}
) {
    const deps = createLoggerDeps(dependencies);

    if (deps.isTTY) {
        const message = logData.createMessage;

        deps.writeStderr(message);
    } else {
        deps.writeStdout(logData);
    }
}
