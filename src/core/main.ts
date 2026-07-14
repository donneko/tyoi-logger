import { startProcess } from "./process/start-process.js";
import { Router } from "./router/router.js";
import type { PluginInput } from "./types/plugin.type.js";
import path from "node:path";

const router = new Router();

export function addPlugin(input: PluginInput) {
    const processPath = path.join(import.meta.dirname, input.path);
    const child = startProcess(processPath);
    router.register({
        name: input.name,
        child,
    });
}
