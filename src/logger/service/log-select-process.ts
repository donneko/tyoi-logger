import type { LoggerCreateData, LoggerDependencies } from "../types/logger.type.js";
import { defaultLoggerDependencies } from "../deps/logger-dependencies.js";

export function logSelectProcess(
    logData: LoggerCreateData,
    dependencies: Partial<LoggerDependencies> = {}
) {
    const deps = {
        ...defaultLoggerDependencies,
        ...dependencies,
    } as LoggerDependencies;

    if (deps.isTTY) {
        const message = logData.createMessage;

        deps.writeStderr(message);
    } else {
        deps.writeStdout(logData);
    }
}
