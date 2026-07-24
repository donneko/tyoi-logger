import type { RenderAllDependencies } from "../types/render-dependencies.type.js";

export function createRenderDependencies<T extends RenderAllDependencies>(
    defaultDependencies: () => T,
    dependencies: Partial<T> = {}
): T {
    return {
        ...defaultDependencies(),
        ...dependencies,
    };
}
