import { defaultLoggerDependencies } from "../deps/logger-dependencies.js";
import type { LoggerDependencies } from "../types/logger.type.js";

export function writeStderr(message: string, dependencies: Partial<LoggerDependencies> = {}) {
    const deps = {
        ...defaultLoggerDependencies,
        ...dependencies,
    } as LoggerDependencies;

    const line = message.endsWith("\n") ? message : message + "\n";

    deps.processStderrWrite(line);
}
