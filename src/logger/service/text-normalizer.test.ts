import { expect, describe, test } from "vitest";
import stringWidth from "string-width";
import stripAnsi from "strip-ansi";
import { textNormalizer } from "./text-normalizer.js";

describe("textNormalizer", () => {
    test("テキストが正常に改行された", () => {
        const data = textNormalizer("12345678901234567890", 10);

        expect(data).toEqual(["1234567890", "1234567890"]);
    });

    test.each([
        ["あいうえお", 4, ["あい", "うえ", "お"]],
        ["😀😀😀", 4, ["😀😀", "😀"]],
        ["ééé", 2, ["éé", "é"]],
    ])("Unicode文字を表示幅に合わせて改行する", (text, width, expected) => {
        const data = textNormalizer(text as string, width as number);

        expect(data).toEqual(expected);
        data.forEach((line) => expect(stringWidth(line)).toBeLessThanOrEqual(width as number));
    });

    test("ANSIカラーを壊さずに改行する", () => {
        const data = textNormalizer("\u001b[94m[INFO]\u001b[39m あいうえお", 11);

        expect(data.map(stripAnsi)).toEqual(["[INFO] あい", "       うえ", "       お"]);
        data.forEach((line) => expect(stringWidth(line)).toBeLessThanOrEqual(11));
    });

    test("未知のANSIエスケープシーケンスでも処理を停止しない", () => {
        const data = textNormalizer("\u001b]0;title\u0007text", 10);

        expect(data).toHaveLength(1);
    });

    test("幅が0以下なら空の配列を返す", () => {
        expect(textNormalizer("text", 0)).toEqual([]);
    });
});
