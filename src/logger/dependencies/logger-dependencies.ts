import type {
    LoggerDependencies,
    LoggerCreateLogDataDependencies,
    LoggerGetWidthDependencies,
    LoggerLogSelectDependencies,
    LoggerWriteDependencies,
} from "../types/logger-dependencies.type.js";
import { getWidth } from "../service/get-width.js";
import { logSelectProcess } from "../service/log-select-process.js";
import { writeStderr } from "../service/write-stderr.js";
import { textNormalizer } from "../service/text-normalizer.js";
import { writeStdout } from "../service/write-stdout.js";
import { createLogData } from "../service/create-log-data.js";
export { createLoggerDependencies } from "./create-logger-deps.js";

export function defaultLoggerDependencies(): LoggerDependencies {
    return {
        isTTY: Boolean(process.stdout.isTTY),
        width: getWidth(),
        writeStderr: writeStderr,
        logSelectProcess: logSelectProcess,
        textNormalizer: textNormalizer,
        createLogData: createLogData,
    };
}

export function defaultCreateLogDataDependencies(): LoggerCreateLogDataDependencies {
    return {
        date: Date,
    };
}

export function defaultGetWidthDependencies(): LoggerGetWidthDependencies {
    return {
        stdoutColumns: process.stdout.columns,
        envColumns: (() => {
            const columns = Number(process.env.COLUMNS);
            return Number.isFinite(columns) ? columns : undefined;
        })(),
    };
}

export function defaultLogSelectDependencies(): LoggerLogSelectDependencies {
    return {
        isTTY: Boolean(process.stdout.isTTY),
        writeStderr: writeStderr,
        writeStdout: writeStdout,
    };
}

export function defaultWriteDependencies(): LoggerWriteDependencies {
    return {
        processStderrWrite: (...args: Parameters<typeof process.stderr.write>) =>
            process.stderr.write(...args),
        processStdoutWrite: (...args: Parameters<typeof process.stdout.write>) =>
            process.stdout.write(...args),
    };
}
