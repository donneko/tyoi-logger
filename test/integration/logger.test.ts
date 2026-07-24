import { describe, expect, it } from "vitest";
import { runTestProcess } from "../helper/run-test-process.js";
import { formatTestProcessResult } from "../helper/format-test-process-result.js";

describe("Logger integration", () => {
    it("ビルド済みLoggerが正常に動く", () => {
        const fixtureUrl = new URL("../fixtures/logger.js", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
        expect(result.stderr, debag).toContain("hello stderr");
    });
});
