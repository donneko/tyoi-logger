import { expect, describe, it } from "vitest";
import { createRenderData } from "./create-render-data";

describe("createRenderData", () => {
    it("データを正常に生成できる", () => {
        const message = "title";
        const selects = ["1", "2", "3"];
        const cursorIndex = 0;

        const lines = createRenderData(message, selects, cursorIndex);

        expect(lines).toEqual(["title", "❯ 1", "  2", "  3"]);
    });

    it("カーソルを移動しても、正常に生成できる。", () => {
        const message = "title";
        const selects = ["1", "2", "3"];
        const cursorIndex = 2;

        const lines = createRenderData(message, selects, cursorIndex);

        expect(lines).toEqual(["title", "  1", "  2", "❯ 3"]);
    });
});
