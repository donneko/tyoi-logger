import type { AskAllDependencies } from "../types/ask-dependencies.type.js";

export function createAskDependencies<T extends AskAllDependencies>(
    defaultDependencies: () => T,
    dependencies: Partial<T> = {}
): T {
    return {
        ...defaultDependencies(),
        ...dependencies,
    };
}
