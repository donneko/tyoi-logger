import type { Renderer } from "../../../../render/index.js";
import { createRenderData } from "./create-render-data.js";

export function logRender(
    message: string,
    selects: string[],
    cursorIndex: number,
    render: Renderer
) {
    const renderData = createRenderData(message, selects, cursorIndex);
    render.set(renderData.join("\n"));
    render.print();
}
