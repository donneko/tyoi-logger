import type { LoggerDependencies } from "../types/logger.type.js";
import { createLoggerDeps } from "../deps/create-logger-deps.js";

export function getWidth(dependencies: Partial<LoggerDependencies> = {}): number {
    const deps = createLoggerDeps(dependencies);

    return deps.stdoutColumns ?? deps.envColumns ?? 80;
}
