import type { LoggerCreateData, LogType, LogConfig } from "./logger.type.js";

export type LoggerDependencies = {
    isTTY: boolean;
    width: number;
    writeStderr: (text: string) => void;
    logSelectProcess: (data: LoggerCreateData) => void;
    textNormalizer: (text: string, width: number) => string[];
    createLogData: (
        type: LogType,
        message: string,
        label: string,
        config?: LogConfig
    ) => LoggerCreateData;
};

export type LoggerCreateLogDataDependencies = {
    date: { now: () => number };
};

export type LoggerGetWidthDependencies = {
    envColumns: number | undefined;
    stdoutColumns: number | undefined;
};

export type LoggerLogSelectDependencies = {
    isTTY: boolean;
    writeStderr: (text: string) => void;
    writeStdout: (data: LoggerCreateData) => void;
};

export type LoggerWriteDependencies = {
    processStderrWrite: (text: string) => void;
    processStdoutWrite: (text: string) => void;
};

export type LoggerAllDependencies =
    | LoggerDependencies
    | LoggerCreateLogDataDependencies
    | LoggerGetWidthDependencies
    | LoggerLogSelectDependencies
    | LoggerWriteDependencies;
