import { expect, describe, it } from "vitest";
import { getWidth } from "./get-width.js";

describe("getWidth", () => {
    it("stdoutColumns が数値のときに、それを返す", () => {
        const deps = {
            stdoutColumns: 20,
        };
        const width = getWidth(deps);

        expect(width).toBe(20);
    });
    it("stdoutColumns が null のときに envColumns を使用する", () => {
        const deps = {
            stdoutColumns: null,
            envColumns: 30,
        };

        const width = getWidth(deps);

        expect(width).toBe(30);
    });
    it("stdoutColumns と envColumns が null のときに 80 になる", () => {
        const deps = {
            stdoutColumns: null,
            envColumns: null,
        };

        const width = getWidth(deps);

        expect(width).toBe(80);
    });
});
