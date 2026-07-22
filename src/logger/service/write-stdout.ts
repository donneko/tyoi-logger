import { defaultLoggerDependencies } from "../deps/logger-dependencies.js";
import type { LoggerCreateData, LoggerDependencies } from "../types/logger.type.js";

export function writeStdout(
    data: LoggerCreateData,
    dependencies: Partial<LoggerDependencies> = {}
) {
    const deps = {
        ...defaultLoggerDependencies,
        ...dependencies,
    } as LoggerDependencies;

    deps.processStdoutWrite(JSON.stringify(data));
}
