import { expect,describe ,test } from "vitest";
import { Logger } from "../../src/app/app-logger.js";

describe("Logger",()=>{

    const logger = new Logger();
    const method = [
        {name:"INFO",fn:logger.createInfo},
        {name:"ERROR",fn:logger.createError},
        {name:"BAR",fn:logger.createBar},
        {name:"MESSAGE",fn:logger.createMessage},
        {name:"PROCESS",fn:logger.createProcess},
        {name:"SUCCESS",fn:logger.createSuccess},
        {name:"SYSTEM",fn:logger.createSystem},
        {name:"WARN",fn:logger.createWarn},
    ];
    const message:string = "HELLO!!";

    method.forEach((testData)=>{
        const {name,fn} = testData;

        test(`${name} がログのデータを正しく作成できる`,()=>{
            const data = fn(message);

            expect(data.type).toBe(name);
            expect(data.message).toBe(`[${name}] ${message}`);
            expect(data.date).toEqual(expect.any(Number));
        });
    });
})
