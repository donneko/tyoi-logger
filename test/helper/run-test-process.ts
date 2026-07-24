import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

export interface TestProcessReturn {
    status: number | null;
    signal: NodeJS.Signals | null;
    stdout: string;
    stderr: string;
    error: Error | undefined;
}
export interface TestProcessConfig {
    timeout: number;
}

const defaultTestProcessConfig: TestProcessConfig = {
    timeout: 5_000,
};

export function runTestProcess(fileUrl: URL, config: Partial<TestProcessConfig> = {}) {
    const useConfig = {
        ...defaultTestProcessConfig,
        ...config,
    };

    const fixturePath = fileURLToPath(fileUrl.href);
    console.log(fixturePath);

    const result = spawnSync(process.execPath, [fixturePath], {
        encoding: "utf8",
        timeout: useConfig.timeout,
    });

    return {
        status: result.status,
        signal: result.signal,
        stdout: result.stdout ?? "",
        stderr: result.stderr ?? "",
        error: result.error,
    };
}
