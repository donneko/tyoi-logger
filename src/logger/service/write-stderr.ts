import { createLoggerDependencies } from "../deps/create-logger-deps.js";
import { defaultWriteDependencies } from "../deps/logger-dependencies.js";
import type { LoggerWriteDependencies } from "../types/logger-dependencies.type.js";

export function writeStderr(message: string, dependencies: Partial<LoggerWriteDependencies> = {}) {
    const deps = createLoggerDependencies<LoggerWriteDependencies>(
        defaultWriteDependencies,
        dependencies
    );

    const line = message.endsWith("\n") ? message : message + "\n";
    deps.processStderrWrite(line);
}
