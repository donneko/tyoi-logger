import { expect, describe, it } from "vitest";
import {
    defaultWriteDependencies,
    defaultCreateLogDataDependencies,
    defaultLogSelectDependencies,
    defaultLoggerDependencies,
} from "./logger-dependencies";

describe("defaultLoggerDependencies", () => {
    it("isTTY を取得できる", () => {
        const deps = defaultLoggerDependencies();

        expect(deps.isTTY).toEqual(expect.any(Boolean));
    });
    it("width を取得できる", () => {
        const deps = defaultLoggerDependencies();

        expect(deps.width).toEqual(expect.any(Number));
    });

    it("writeStderr を実行できる", () => {
        const deps = defaultLoggerDependencies();

        expect(() => {
            deps.writeStderr("test");
        }).not.toThrow();
    });
    it("logSelectProcess を実行できる", () => {
        const deps = defaultLoggerDependencies();
        const data = {
            type: "string",
            message: "string",
            createMessage: "string",
            date: 100,
        };

        expect(() => {
            deps.logSelectProcess(data);
        }).not.toThrow();
    });
    it("textNormalizer を実行できる", () => {
        const deps = defaultLoggerDependencies();

        expect(() => {
            deps.textNormalizer("test", 10);
        }).not.toThrow();
    });
    it("createLogData を実行できる", () => {
        const deps = defaultLoggerDependencies();

        expect(() => {
            deps.createLogData("INFO", "aaaa", "aaaa");
        }).not.toThrow();
    });
});

describe("defaultCreateLogDataDependencies", () => {
    it("date.now を実行できる", () => {
        const deps = defaultCreateLogDataDependencies();

        expect(() => {
            deps.date.now();
        }).not.toThrow();
    });
});

describe("defaultLogSelectDependencies", () => {
    it("isTTY を取得できる", () => {
        const deps = defaultLoggerDependencies();

        expect(deps.isTTY).toEqual(expect.any(Boolean));
    });
    it("writeStderr を実行できる", () => {
        const deps = defaultLogSelectDependencies();

        expect(() => {
            deps.writeStderr("test");
        }).not.toThrow();
    });
    it("writeStdout を実行できる", () => {
        const deps = defaultLogSelectDependencies();
        const data = {
            type: "string",
            message: "string",
            createMessage: "string",
            date: 100,
        };
        expect(() => {
            deps.writeStdout(data);
        }).not.toThrow();
    });
});

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
