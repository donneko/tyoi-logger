# Renderer 仕様書

## 概要

`Renderer` クラスは、出力したログをあとから変更したり、消去することを目的に開発されました。
入力は文字列で受け取り、出力はターミナル幅に合わせて整形はされずに、出力されます。

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

- ターミナル幅に合わせて整形はされずに、出力されます。
- `Renderer` クラスは、ログの出力を制御するためのクラスであり、ログの生成やフォーマットは行いません。
- `set()` メソッドで設定されたログは、`print()` メソッドを呼び出すまで出力されません。
- `set()` メソッドの引数として渡される文字列は、改行コードを含むことができます。
