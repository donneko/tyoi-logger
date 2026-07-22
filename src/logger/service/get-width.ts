import type { LoggerDependencies } from "../types/logger.type.js";
import { defaultLoggerDependencies } from "../deps/logger-dependencies.js";

export function getWidth(dependencies: Partial<LoggerDependencies> = {}): number {
    const deps = {
        ...defaultLoggerDependencies,
        ...dependencies,
    } as LoggerDependencies;

    return deps.stdoutColumns ?? deps.envColumns ?? 80;
}
