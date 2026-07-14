import type { RouterInput } from "../types/router.type.js";

export function isRouterInput(input: unknown): input is RouterInput {
    if (!input || typeof input !== "object") return false;
    if (!("to" in input) || !("data" in input)) return false;
    return typeof input.to === "string";
}
