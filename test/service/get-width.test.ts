import { expect,describe ,test } from "vitest";
import { getWidth } from "../../src/service/get-width.js";

describe("getWidth",()=>{

    test("戻り値が数値",()=>{
        const data = getWidth();

        expect(data).toEqual(expect.any(Number));
    });
});