import type { Renderer } from "../../../../render/index.js";

export function logClearup(keySelect: (key: string) => void, render: Renderer) {
    render.clear();
    process.stdin.setRawMode(false);
    process.stdin.off("data", keySelect);
    process.stdin.pause();
}
