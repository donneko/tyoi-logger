import type { LoggerDependencies } from "../types/logger.type.js";
import { getWidth } from "../service/get-width.js";
import { logSelectProcess } from "../service/log-select-process.js";
import { writeStderr } from "../service/write-stderr.js";
import { textNormalizer } from "../service/text-normalizer.js";
import { writeStdout } from "../service/write-stdout.js";
import { createLogData } from "../service/create-log-data.js";

export function defaultLoggerDependencies(): LoggerDependencies {
    return {
        isTTY: Boolean(process.stdout.isTTY),
        width: getWidth(),
        writeStderr: writeStderr,
        writeStdout: writeStdout,
        processStderrWrite: process.stderr.write,
        processStdoutWrite: process.stdout.write,
        logSelectProcess: logSelectProcess,
        textNormalizer: textNormalizer,
        date: Date,
        stdoutColumns: process.stdout.columns,
        envColumns: (() => {
            const columns = Number(process.env.COLUMNS);
            return Number.isFinite(columns) ? columns : null;
        })(),
        createLogData: createLogData,
    };
}
