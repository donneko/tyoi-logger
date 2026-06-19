import { expect,describe ,test } from "vitest";
import { textNormalizer } from "../../src/service/text-normalizer.js";

describe("textNormalizer",()=>{

    test("テキストが正常に改行された",()=>{
        const data = textNormalizer("12345678901234567890",10);

        expect(data).toEqual([
            "1234567890",
            "1234567890"
        ]);
    });
});