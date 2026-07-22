export type LoggerCreateData = {
    type: string;
    message: string;
    createMessage: string;
    date: number;
};
export type LogType =
    "INFO" | "WARN" | "ERROR" | "SUCCESS" | "PROCESS" | "MESSAGE" | "SYSTEM" | "BAR";

export type LogConfig = {
    labelHidden?: boolean;
};

export type LoggerDependencies = {
    isTTY: boolean;
    width: number;
    writeStderr: (text: string) => void;
    writeStdout: (data: LoggerCreateData) => void;
    logSelectProcess: (data: LoggerCreateData) => void;
    textNormalizer: (text: string, width: number) => string[];
    date: { now: () => number };
    envColumns: number | null | undefined;
    stdoutColumns: number | null | undefined;
    processStderrWrite: (text: string) => void;
    processStdoutWrite: (text: string) => void;
    createLogData: (
        type: LogType,
        message: string,
        label: string,
        config?: LogConfig
    ) => LoggerCreateData;
};
