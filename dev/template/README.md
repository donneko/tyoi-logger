# 〇〇 仕様書

## 概要

`〇〇` クラスは、出力したログをあとから変更したり、消去することを目的に開発されました。

## 基本的な使い方

```ts
import { Renderer } from "@donneko/tyoi-logger";

const renderer = new Renderer();

const text = "[INFO] 準備完了\n[INFO] 起動しました\n[INFO] 接続に失敗しました";

renderer.set(text);
renderer.print();
renderer.clear();

```

## 公開 API

### `set(text)`

ログを設定します。

#### 引数

- `text: string` — 設定するログテキスト

### `print()`

設定されたログを出力します。

### `clear()`

出力されたログを消去します。

## 実装上の補足

-
