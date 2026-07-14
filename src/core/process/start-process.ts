import { fork, type ChildProcess } from "node:child_process";

export function startProcess(path: string): ChildProcess {
    const child = fork(path, [], {
        stdio: ["inherit", "inherit", "inherit", "ipc"],
    });

    return child;
}
