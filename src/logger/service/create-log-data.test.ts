import { expect, describe, it } from "vitest";
import { createLogData } from "./create-log-data";
import pc from "picocolors";
import type { LogType } from "../types/logger.type.js";

describe("createLogData", () => {
    it("データを正常に生成できる", () => {
        const deps = {
            date: { now: () => 20 },
        };

        const type: LogType = "INFO";
        const label = pc.blueBright(`[${type}]`);
        const message = "test message";

        const createData = createLogData(type, message, label, {}, deps);

        expect(createData.type).toBe(type);
        expect(createData.message).toBe(`[${type}] ${message}`);
        expect(createData.createMessage).toBe(`${label} ${message}`);
        expect(createData.date).toBe(20);
    });

    it("labelHidden が true のときデータを正常に生成できる", () => {
        const deps = {
            date: { now: () => 20 },
        };

        const type: LogType = "INFO";
        const label = pc.blueBright(`[${type}]`);
        const message = "test message";

        const createData = createLogData(type, message, label, { labelHidden: true }, deps);

        expect(createData.type).toBe(type);
        expect(createData.message).toBe(`${message}`);
        expect(createData.createMessage).toBe(`${message}`);
        expect(createData.date).toBe(20);
    });
});
