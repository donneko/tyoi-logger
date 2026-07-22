# Ask 仕様書

## 概要

`Ask` クラスは、ユーザーからの入力を受け取りるために開発されました。

## 基本的な使い方

```ts
import { Ask } from "@donneko/tyoi-logger";

const ask = new Ask();

const inputAnswer = await ask.input("質問を入力してください");
const selectAnswer = await ask.select([
  "選択肢1",
  "選択肢2",
  "選択肢3",
]);

console.log(`回答: ${inputAnswer}`);
console.log(`選択: ${selectAnswer}`);

```

## 公開 API

### `input(text)`

ユーザーからの入力を受け取ります。

#### 引数

- `text: string` — ユーザーに提示する質問文

#### 戻り値
- `text: string` — ユーザーの入力した文字列

### `select(list)`

ユーザーに選択肢を提示し、選択を受け取ります。

#### 引数

- `list: string[]` — 選択肢の配列

#### 戻り値
- `text: string` — ユーザーの選択した文字列

## 実装上の補足
- `input()` メソッドは、ユーザーの入力を受け取るための非同期メソッドです。
- `select()` メソッドは、ユーザーに選択肢を提示し、選択を受け取るための非同期メソッドです。