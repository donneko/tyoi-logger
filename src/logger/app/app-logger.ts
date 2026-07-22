import pc from "picocolors";
import stringWidth from "string-width";
import type { LogType, LoggerCreateData } from "../types/logger.type.js";
import { defaultLoggerDependencies } from "../deps/logger-dependencies.js";
import { createLoggerDependencies } from "../deps/create-logger-deps.js";
import type { LoggerDependencies } from "../types/logger-dependencies.type.js";

export class Logger {
    info = (message: string, dependencies: Partial<LoggerDependencies> = {}): LoggerCreateData => {
        const deps = createLoggerDependencies<LoggerDependencies>(
            defaultLoggerDependencies,
            dependencies
        );
        const data = this.createInfo(message, deps);
        deps.logSelectProcess(data);
        return data;
    };
    createInfo = (
        message: string,
        dependencies: Partial<LoggerDependencies> = {}
    ): LoggerCreateData => {
        const deps = createLoggerDependencies<LoggerDependencies>(
            defaultLoggerDependencies,
            dependencies
        );
        const type: LogType = "INFO";
        return deps.createLogData(type, message, pc.blueBright(`[${type}]`));
    };

    warn = (message: string, dependencies: Partial<LoggerDependencies> = {}): LoggerCreateData => {
        const deps = createLoggerDependencies<LoggerDependencies>(
            defaultLoggerDependencies,
            dependencies
        );
        const data = this.createWarn(message, deps);
        deps.logSelectProcess(data);
        return data;
    };
    createWarn = (
        message: string,
        dependencies: Partial<LoggerDependencies> = {}
    ): LoggerCreateData => {
        const deps = createLoggerDependencies<LoggerDependencies>(
            defaultLoggerDependencies,
            dependencies
        );
        const type: LogType = "WARN";
        return deps.createLogData(type, message, pc.yellow(`[${type}]`));
    };

    error = (message: string, dependencies: Partial<LoggerDependencies> = {}): LoggerCreateData => {
        const deps = createLoggerDependencies<LoggerDependencies>(
            defaultLoggerDependencies,
            dependencies
        );
        const data = this.createError(message, deps);
        deps.logSelectProcess(data);
        return data;
    };
    createError = (
        message: string,
        dependencies: Partial<LoggerDependencies> = {}
    ): LoggerCreateData => {
        const deps = createLoggerDependencies<LoggerDependencies>(
            defaultLoggerDependencies,
            dependencies
        );
        const type: LogType = "ERROR";
        return deps.createLogData(type, message, pc.red(`[${type}]`));
    };

    success = (
        message: string,
        dependencies: Partial<LoggerDependencies> = {}
    ): LoggerCreateData => {
        const deps = createLoggerDependencies<LoggerDependencies>(
            defaultLoggerDependencies,
            dependencies
        );
        const data = this.createSuccess(message, deps);
        deps.logSelectProcess(data);
        return data;
    };
    createSuccess = (
        message: string,
        dependencies: Partial<LoggerDependencies> = {}
    ): LoggerCreateData => {
        const deps = createLoggerDependencies<LoggerDependencies>(
            defaultLoggerDependencies,
            dependencies
        );
        const type: LogType = "SUCCESS";
        return deps.createLogData(type, message, pc.green(`[${type}]`));
    };

    process = (
        message: string,
        dependencies: Partial<LoggerDependencies> = {}
    ): LoggerCreateData => {
        const deps = createLoggerDependencies<LoggerDependencies>(
            defaultLoggerDependencies,
            dependencies
        );
        const data = this.createProcess(message, deps);
        deps.logSelectProcess(data);
        return data;
    };
    createProcess = (
        message: string,
        dependencies: Partial<LoggerDependencies> = {}
    ): LoggerCreateData => {
        const deps = createLoggerDependencies<LoggerDependencies>(
            defaultLoggerDependencies,
            dependencies
        );
        const type: LogType = "PROCESS";
        return deps.createLogData(type, message, pc.magentaBright(`[${type}]`));
    };

    message = (
        message: string,
        dependencies: Partial<LoggerDependencies> = {}
    ): LoggerCreateData => {
        const deps = createLoggerDependencies<LoggerDependencies>(
            defaultLoggerDependencies,
            dependencies
        );
        const data = this.createMessage(message, deps);
        deps.logSelectProcess(data);
        return data;
    };
    createMessage = (
        message: string,
        dependencies: Partial<LoggerDependencies> = {}
    ): LoggerCreateData => {
        const deps = createLoggerDependencies<LoggerDependencies>(
            defaultLoggerDependencies,
            dependencies
        );
        const type: LogType = "MESSAGE";
        return deps.createLogData(type, message, pc.gray(`[${type}]`));
    };

    system = (
        message: string,
        dependencies: Partial<LoggerDependencies> = {}
    ): LoggerCreateData => {
        const deps = createLoggerDependencies<LoggerDependencies>(
            defaultLoggerDependencies,
            dependencies
        );
        const data = this.createSystem(message, deps);
        deps.logSelectProcess(data);
        return data;
    };
    createSystem = (
        message: string,
        dependencies: Partial<LoggerDependencies> = {}
    ): LoggerCreateData => {
        const deps = createLoggerDependencies<LoggerDependencies>(
            defaultLoggerDependencies,
            dependencies
        );
        const type: LogType = "SYSTEM";
        return deps.createLogData(type, message, pc.magentaBright(`[${type}]`));
    };

    bar = (dependencies: Partial<LoggerDependencies> = {}): LoggerCreateData => {
        const deps = createLoggerDependencies<LoggerDependencies>(
            defaultLoggerDependencies,
            dependencies
        );
        const data = this.createBar(deps);
        deps.logSelectProcess(data);
        return data;
    };
    createBar = (dependencies: Partial<LoggerDependencies> = {}): LoggerCreateData => {
        const deps = createLoggerDependencies<LoggerDependencies>(
            defaultLoggerDependencies,
            dependencies
        );

        // ウィンドウで生成したときに、横幅を超えないように
        const message = `${"─".repeat(deps.width - 2)}`;

        const type: LogType = "BAR";
        return deps.createLogData(type, message, pc.blueBright(`[${type}]`), { labelHidden: true });
    };

    private createLine(line: string, width: number): string {
        const repeatNumber = width - stringWidth(line);
        const safeRepeatNumber = repeatNumber >= 0 ? repeatNumber : 0;
        return `│${line}${" ".repeat(safeRepeatNumber)}│`;
    }

    window = (
        window: { title: string; content: LoggerCreateData[] },
        dependencies: Partial<LoggerDependencies> = {}
    ): void => {
        const deps = createLoggerDependencies<LoggerDependencies>(
            defaultLoggerDependencies,
            dependencies
        );

        if (!deps.isTTY) {
            window.content.forEach((data) => {
                deps.logSelectProcess(data);
            });
            return;
        }

        const width = Math.max(0, deps.width - 2);
        const output: string[] = [];

        output.push(`┌${"─".repeat(width)}┐`);

        deps.textNormalizer(window.title, width).forEach((text) => {
            output.push(this.createLine(text, width));
        });

        output.push(`├${"─".repeat(width)}┤`);

        window.content.forEach((lineText) => {
            deps.textNormalizer(lineText.createMessage, width).forEach((text) => {
                output.push(this.createLine(text, width));
            });
        });

        output.push(`└${"─".repeat(width)}┘`);

        // outputの行をcliに出す
        output.forEach((o) => deps.writeStderr(o));
    };
}
