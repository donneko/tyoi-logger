import { expect, describe, vi, it } from "vitest";
import { writeStderr } from "./write-stderr.js";

describe("writeStderr", () => {
    it("末尾に \\n がある場合そのままにする", () => {
        const deps = {
            processStderrWrite: vi.fn(),
        };

        const message = "test message\n";
        writeStderr(message, deps);

        expect(deps.processStderrWrite).toHaveBeenCalledWith("test message\n");
    });

    it("末尾に \\n がない場合、\\n を追加する", () => {
        const deps = {
            processStderrWrite: vi.fn(),
        };

        const message = "test message";
        writeStderr(message, deps);

        expect(deps.processStderrWrite).toHaveBeenCalledWith("test message\n");
    });
});
