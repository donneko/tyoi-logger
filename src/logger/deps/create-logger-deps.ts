import type { LoggerDependencies } from "../types/logger.type.js";
import { defaultLoggerDependencies } from "./logger-dependencies.js";

export function createLoggerDeps(
    dependencies: Partial<LoggerDependencies> = {}
): LoggerDependencies {
    const deps = {
        ...defaultLoggerDependencies(),
        ...dependencies,
    } as LoggerDependencies;
    return deps;
}
