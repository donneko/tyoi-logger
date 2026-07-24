import { expect, describe, it } from "vitest";
import { defaultWriteDependencies } from "./render-dependencies";

describe("defaultWriteDependencies", () => {
    it("processStderrWrite を実行できる", () => {
        const deps = defaultWriteDependencies();

        expect(() => {
            deps.processStderrWrite("test");
        }).not.toThrow();
    });
    it("processStdoutWrite を実行できる", () => {
        const deps = defaultWriteDependencies();

        expect(() => {
            deps.processStdoutWrite("test");
        }).not.toThrow();
    });
});
