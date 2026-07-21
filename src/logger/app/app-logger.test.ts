import { expect, describe, test } from "vitest";
import { Logger } from "../../index.js";
import type { LogType } from "../../types/logger.js";

describe("Logger", () => {
    const logger = new Logger();
    const method: { name: LogType; fn: Function }[] = [
        { name: "INFO", fn: logger.createInfo },
        { name: "ERROR", fn: logger.createError },
        { name: "MESSAGE", fn: logger.createMessage },
        { name: "PROCESS", fn: logger.createProcess },
        { name: "SUCCESS", fn: logger.createSuccess },
        { name: "SYSTEM", fn: logger.createSystem },
        { name: "WARN", fn: logger.createWarn },
    ];
    const message: string = "HELLO!!";

    method.forEach((testData) => {
        const { name, fn } = testData;

        test(`${name} がログのデータを正しく作成できる`, () => {
            const data = fn(message);

            expect(data.type).toBe(name);
            expect(data.message).toBe(`[${name}] ${message}`);
            expect(data.date).toEqual(expect.any(Number));
        });
    });

    test("BAR がログのデータを正しく作成できる", () => {
        const data = logger.createBar();
        const name: LogType = "BAR";

        expect(data.type).toBe(name);
        expect(data.message).toEqual(expect.any(String));
        expect(data.date).toEqual(expect.any(Number));
    });
});
