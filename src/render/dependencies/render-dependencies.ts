export { createRenderDependencies } from "./create-render-dependencies.js";
import type { RenderWriteDependencies } from "../types/render-dependencies.type.js";

export function defaultWriteDependencies(): RenderWriteDependencies {
    return {
        processStderrWrite: (...args: Parameters<typeof process.stderr.write>) =>
            process.stderr.write(...args),
        processStdoutWrite: (...args: Parameters<typeof process.stdout.write>) =>
            process.stdout.write(...args),
    };
}
