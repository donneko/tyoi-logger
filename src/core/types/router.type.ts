import type { ChildProcess } from "node:child_process";

export type RouterInput = {
    from?: 送り元;
    to: 宛先;

    data: 処理用データ;
};

type 送り元 = string;

type 宛先 = string;

type 処理用データ = {
    type: string;
    data?: unknown;
};

export type RouterPlugin = {
    name: プラグインの認識名;
    config?: ルータの設定;
    child: ChildProcess;
};

export type プラグインの認識名 = string;

type ルータの設定 = unknown; //未定 プラグインのルータからの設定とか？
