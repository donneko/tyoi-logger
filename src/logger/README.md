# Logger 仕様書

## 概要

`Logger` クラスは、アプリケーション内のログ生成と出力形式を統一するためのクラスです。
用途別のログレベル、ログデータのみを生成する API、区切り線、複数のログを枠で囲むウィンドウ表示を提供します。

## 基本的な使い方

```ts
import { Logger } from "@donneko/tyoi-logger";

const logger = new Logger();

logger.info("処理を開始しました");
logger.warn("設定を確認してください");
logger.error("処理に失敗しました");
```

## 出力先と出力形式

- TTY 環境では、色付きの文字列を標準エラー出力へ出力します。
- 非 TTY 環境では、`LoggerCreateData` を JSON 文字列として標準出力へ出力します。
- `create` から始まるメソッドはログを出力せず、ログデータのみを返します。

## 公開 API

### 通常ログ

通常ログには、ログを即時出力するメソッドと、対応するログデータ生成メソッドがあります。

| 出力メソッド | データ生成メソッド | ログ種別 | TTY でのラベル色 |
| --- | --- | --- | --- |
| `info(message)` | `createInfo(message)` | `INFO` | 明るい青 |
| `warn(message)` | `createWarn(message)` | `WARN` | 黄 |
| `error(message)` | `createError(message)` | `ERROR` | 赤 |
| `success(message)` | `createSuccess(message)` | `SUCCESS` | 緑 |
| `process(message)` | `createProcess(message)` | `PROCESS` | 明るいマゼンタ |
| `message(message)` | `createMessage(message)` | `MESSAGE` | グレー |
| `system(message)` | `createSystem(message)` | `SYSTEM` | 明るいマゼンタ |

#### 引数

- `message: string` — 出力またはデータ化するログメッセージ

#### 戻り値

- `LoggerCreateData` — 作成されたログデータ

#### 使用例

```ts
const outputData = logger.info("サーバーを起動しました");
const createdData = logger.createError("接続に失敗しました");
```

`info` はログを出力してデータを返します。`createError` はデータを返すだけで、ログを出力しません。

### `bar()` / `createBar()`

ターミナル幅に合わせた区切り線を扱います。ログ種別は `BAR` で、ラベルは表示されません。

- `bar()` — 区切り線を出力し、作成したログデータを返します。
- `createBar()` — 区切り線のログデータのみを返します。

#### 戻り値

- `LoggerCreateData` — 区切り線を表すログデータ

```ts
logger.bar();
const barData = logger.createBar();
```

### `window(title,content)`

タイトルと複数のログを、ターミナル幅に合わせた枠の中へ出力します。長いテキストは表示幅に応じて正規化されます。

#### 引数

```ts
title: string;
content: LoggerCreateData[];
```

- `title` — ウィンドウのタイトル
- `content` — `createInfo` などで生成したログデータの配列

#### 戻り値

- `void`

#### 使用例

```ts
logger.window(
    "起動結果",
    [
        logger.createInfo("設定を読み込みました"),
        logger.createSuccess("起動しました"),
    ],
);
```

TTY 環境では枠付きで標準エラー出力へ表示します。非 TTY 環境では枠を作らず、`content` 内の各ログを通常のログと同じ方法で順番に出力します。

## `LoggerCreateData`

各ログ生成メソッドが返すデータ構造です。

```ts
type LoggerCreateData = {
    type: string;
    message: string;
    createMessage: string;
    date: number;
};
```

| プロパティ | 説明 |
| --- | --- |
| `type` | `INFO`、`WARN` などのログ種別 |
| `message` | 色情報を含まない、外部出力向けのログメッセージ |
| `createMessage` | TTY 表示向けの、色付きラベルを含むログメッセージ |
| `date` | ログを生成した時刻。`Date.now()` が返すミリ秒単位の値 |

例:

```ts
const data = logger.createInfo("準備完了");

// 概念上のデータ
// {
//     type: "INFO",
//     message: "[INFO] 準備完了",
//     createMessage: "[INFO] 準備完了", // TTY ではラベルに色が付く
//     date: 1750000000000,
// }
```

## ログ種別

```ts
type LogType =
    | "INFO"
    | "WARN"
    | "ERROR"
    | "SUCCESS"
    | "PROCESS"
    | "MESSAGE"
    | "SYSTEM"
    | "BAR";
```

## 実装上の補足

- ターミナル幅は内部の `getWidth()` で取得します。
- ウィンドウ内の行は、表示幅を考慮して枠の幅に収まるよう処理されます。
- 公開メソッドはアロー関数のプロパティとして定義されているため、コールバックとして渡しても `this` が保持されます。
