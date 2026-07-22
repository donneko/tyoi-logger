import { logClearup } from "../service/log-clearup.js";
import { logSetup } from "../service/log-setup.js";
import { Renderer } from "../../../../render/index.js";
import { logRender } from "../service/log-render.js";

export async function askSelect(message: string, selects: string[]): Promise<string | undefined> {
    return new Promise((resolve) => {
        let index = 0;
        const render = new Renderer();

        const keySelect = (key: string) => {
            switch (key) {
                case "\u001b[A": {
                    // 上矢印
                    index = Math.max(0, index - 1);
                    logRender(message, selects, index, render);
                    break;
                }
                case "\u001b[B": {
                    // 下矢印
                    index = Math.min(selects.length - 1, index + 1);
                    logRender(message, selects, index, render);
                    break;
                }
                case "\r": // 決定
                    logClearup(keySelect, render);
                    resolve(selects[index]);
                    break;
                case "\u0003": // 失敗
                    logClearup(keySelect, render);
                    resolve(undefined);
                    break;
            }
        };

        if (process.stdin.isTTY) {
            logSetup(keySelect);
            logRender(message, selects, index, render);
        } else {
            resolve(undefined);
        }
    });
}
