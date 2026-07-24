import {
    createLoggerDependencies,
    defaultGetWidthDependencies,
} from "../dependencies/logger-dependencies.js";
import type { LoggerGetWidthDependencies } from "../types/logger-dependencies.type.js";

export function getWidth(dependencies: Partial<LoggerGetWidthDependencies> = {}): number {
    const deps = createLoggerDependencies<LoggerGetWidthDependencies>(
        defaultGetWidthDependencies,
        dependencies
    );

    return deps.stdoutColumns ?? deps.envColumns ?? 80;
}
