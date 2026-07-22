import { createLoggerDeps } from "../deps/create-logger-deps.js";
import type { LoggerDependencies } from "../types/logger.type.js";

export function writeStderr(message: string, dependencies: Partial<LoggerDependencies> = {}) {
    const deps = createLoggerDeps(dependencies);

    const line = message.endsWith("\n") ? message : message + "\n";

    deps.processStderrWrite(line);
}
