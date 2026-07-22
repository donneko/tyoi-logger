import { createLoggerDeps } from "../deps/create-logger-deps.js";
import type { LoggerCreateData, LoggerDependencies } from "../types/logger.type.js";

export function writeStdout(
    data: LoggerCreateData,
    dependencies: Partial<LoggerDependencies> = {}
) {
    const deps = createLoggerDeps(dependencies);

    deps.processStdoutWrite(JSON.stringify(data));
}
