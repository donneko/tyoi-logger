import type { RouterInput, RouterPlugin, プラグインの認識名 } from "../types/router.type.js";
import { isRouterInput } from "./is-router-input.js";

export class Router {
    private plugin = new Map<プラグインの認識名, RouterPlugin>();

    send(input: RouterInput) {
        if (!this.plugin.has(input.to)) return;

        const pluginData = this.plugin.get(input.to);

        pluginData?.child.send(input.data);
    }

    register(plugin: RouterPlugin) {
        if (this.plugin.has(plugin.name)) return;

        this.pluginSetup(plugin);

        this.plugin.set(plugin.name, plugin);
    }
    unregister(pluginName: プラグインの認識名) {
        this.plugin.delete(pluginName);
    }

    private pluginSetup(plugin: RouterPlugin) {
        const { child, name } = plugin;

        child.on("message", (message: unknown) => {
            if (!isRouterInput(message)) return;
            this.send(message);
        });

        child.on("exit", () => {
            this.plugin.delete(name);
        });
    }
}
