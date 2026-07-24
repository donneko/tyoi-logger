import { expect, describe, vi, it } from "vitest";
import { Renderer } from "./app-render";

describe("Renderer", () => {
    it("正しく print できる", () => {
        const renderer = new Renderer();
        const deps = {
            processStderrWrite: vi.fn(),
        };
        const testString = "aaa aaa\nbbb bbb\nccc ccc\n";

        renderer.set(testString);
        renderer.print(deps);

        expect(deps.processStderrWrite).toHaveBeenNthCalledWith(1, "aaa aaa\n");
        expect(deps.processStderrWrite).toHaveBeenNthCalledWith(2, "bbb bbb\n");
        expect(deps.processStderrWrite).toHaveBeenNthCalledWith(3, "ccc ccc\n");

        expect(deps.processStderrWrite).toHaveBeenCalledTimes(3);
    });

    it("二回 print を連続で行える", () => {
        const renderer = new Renderer();
        const deps = {
            processStderrWrite: vi.fn(),
        };
        const testString = "aaa aaa\nbbb bbb\nccc ccc\n";

        renderer.set(testString);
        renderer.print(deps);
        renderer.print(deps);

        expect(deps.processStderrWrite).toHaveBeenNthCalledWith(1, "aaa aaa\n");
        expect(deps.processStderrWrite).toHaveBeenNthCalledWith(2, "bbb bbb\n");
        expect(deps.processStderrWrite).toHaveBeenNthCalledWith(3, "ccc ccc\n");

        expect(deps.processStderrWrite).toHaveBeenNthCalledWith(4, "aaa aaa\n");
        expect(deps.processStderrWrite).toHaveBeenNthCalledWith(5, "bbb bbb\n");
        expect(deps.processStderrWrite).toHaveBeenNthCalledWith(6, "ccc ccc\n");

        expect(deps.processStderrWrite).toHaveBeenCalledTimes(6);
    });

    it("set されていない状態で print した後に set してもう一度 print する", () => {
        const renderer = new Renderer();
        const deps = {
            processStderrWrite: vi.fn(),
        };
        renderer.print(deps);

        const testString = "aaa aaa\nbbb bbb\nccc ccc\n";

        renderer.set(testString);
        renderer.print(deps);

        expect(deps.processStderrWrite).toHaveBeenNthCalledWith(1, "aaa aaa\n");
        expect(deps.processStderrWrite).toHaveBeenNthCalledWith(2, "bbb bbb\n");
        expect(deps.processStderrWrite).toHaveBeenNthCalledWith(3, "ccc ccc\n");

        expect(deps.processStderrWrite).toHaveBeenCalledTimes(3);
    });

    it("set した後に print して set して、print する", () => {
        const renderer = new Renderer();
        const deps = {
            processStderrWrite: vi.fn(),
        };
        const testString = "aaa aaa\nbbb bbb\nccc ccc\n";
        const testString2 = "nnn nnn\niii iii\naaa ccc\n";

        renderer.set(testString);
        renderer.print(deps);
        renderer.set(testString2);
        renderer.print(deps);

        expect(deps.processStderrWrite).toHaveBeenNthCalledWith(1, "aaa aaa\n");
        expect(deps.processStderrWrite).toHaveBeenNthCalledWith(2, "bbb bbb\n");
        expect(deps.processStderrWrite).toHaveBeenNthCalledWith(3, "ccc ccc\n");

        expect(deps.processStderrWrite).toHaveBeenNthCalledWith(4, "nnn nnn\n");
        expect(deps.processStderrWrite).toHaveBeenNthCalledWith(5, "iii iii\n");
        expect(deps.processStderrWrite).toHaveBeenNthCalledWith(6, "aaa ccc\n");
        expect(deps.processStderrWrite).toHaveBeenCalledTimes(6);
    });
});
