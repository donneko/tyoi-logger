import { expect, describe, it } from "vitest";
import { Logger } from "../../index.js";
import type { LogType, LoggerCreateData } from "../types/logger.type.js";
import type { LoggerDependencies } from "../types/logger-dependencies.type.js";
import pc from "picocolors";

describe("Logger クラスの通常ログ系", () => {
    const logger = new Logger();
    const method: {
        name: LogType;
        fn: (message: string, dependencies?: Partial<LoggerDependencies>) => LoggerCreateData;
        color: (text: string) => string;
    }[] = [
        { name: "INFO", fn: logger.createInfo, color: pc.blueBright },
        { name: "ERROR", fn: logger.createError, color: pc.red },
        { name: "MESSAGE", fn: logger.createMessage, color: pc.gray },
        { name: "PROCESS", fn: logger.createProcess, color: pc.magentaBright },
        { name: "SUCCESS", fn: logger.createSuccess, color: pc.green },
        { name: "SYSTEM", fn: logger.createSystem, color: pc.magentaBright },
        { name: "WARN", fn: logger.createWarn, color: pc.yellow },
    ];
    const message: string = "HELLO!!";

    method.forEach((testData) => {
        const { name, fn, color } = testData;

        it(`${name} がログのデータを正しく作成できる`, () => {
            const data = fn(message);

            expect(data.type).toBe(name);
            expect(data.message).toBe(`[${name}] ${message}`);
            expect(data.createMessage).toBe(`${color(`[${name}]`)} ${message}`);
            expect(data.date).toEqual(expect.any(Number));
        });
    });
});

describe("Logger クラスのBAR", () => {
    it("ログのデータを正しく作成できる", () => {
        const logger = new Logger();
        const data = logger.createBar({ width: 7 });
        const name: LogType = "BAR";

        // ウィンドウで生成したときに、横幅を超えないようにするために、width - 2です。
        expect(data.type).toBe(name);
        expect(data.message).toBe("─────");
        expect(data.createMessage).toBe("─────");
        expect(data.date).toEqual(expect.any(Number));
    });
});
