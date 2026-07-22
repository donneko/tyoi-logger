import { createLoggerDependencies } from "../deps/create-logger-deps.js";
import { defaultWriteDependencies } from "../deps/logger-dependencies.js";
import type { LoggerWriteDependencies } from "../types/logger-dependencies.type.js";
import type { LoggerCreateData } from "../types/logger.type.js";

export function writeStdout(
    data: LoggerCreateData,
    dependencies: Partial<LoggerWriteDependencies> = {}
) {
    const deps = createLoggerDependencies<LoggerWriteDependencies>(
        defaultWriteDependencies,
        dependencies
    );

    deps.processStdoutWrite(JSON.stringify(data));
}
