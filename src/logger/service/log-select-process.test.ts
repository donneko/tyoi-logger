import { expect, describe, vi, it } from "vitest";
import { logSelectProcess } from "./log-select-process";

describe("logSelectProcess", () => {
    const testLoggerCreateData = {
        type: "type",
        message: "message",
        createMessage: "createMessage",
        date: 100,
    };

    it("TTYのときに writeStderr に createMessage を送る", () => {
        const deps = {
            writeStderr: vi.fn(),
            writeStdout: vi.fn(),
            isTTY: true,
        };

        logSelectProcess(testLoggerCreateData, deps);

        expect(deps.writeStderr).toHaveBeenCalledWith(testLoggerCreateData.createMessage);
        expect(deps.writeStdout).not.toHaveBeenCalled();
    });
    it("非TTYのときに writeStdout に LoggerCreateData を送る", () => {
        const deps = {
            writeStderr: vi.fn(),
            writeStdout: vi.fn(),
            isTTY: false,
        };

        logSelectProcess(testLoggerCreateData, deps);

        expect(deps.writeStderr).not.toHaveBeenCalled();
        expect(deps.writeStdout).toHaveBeenCalledWith(testLoggerCreateData);
    });
});
