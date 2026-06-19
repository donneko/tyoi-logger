import pc from "picocolors";
import stringWidth from "string-width";
import stripAnsi from "strip-ansi";

function getWidth():number{
    const number = Number(process.env.COLUMNS);
    const envColumns = Number.isFinite(number)? number : null;

    return process.stdout.columns ??
            envColumns ??
            80;
}

function calcAnsiLength(text:string){
    const cleanText =  stripAnsi(text);
    const ansiLength = (text.length - cleanText.length);
    return ansiLength;
}


function textNormalizer(text:string,width:number):string[] {

    const textList = (Array.isArray(text.split("\n")))?
        text.split("\n"):
        [text];

    let fixedTextList:string[] = [];
    const headerLength = stringWidth(stripAnsi(textList[0]?? "").match(/\[[a-zA-Z1-9]*\]\s/)?.[0] ?? "");

    for(const text of textList){
        const index = textList.indexOf(text);
        const calcAnsiLengthValue = calcAnsiLength(text);
        const textWidth   = stringWidth(text);
        const overContent = Math.ceil(textWidth / width);
        const overHeader  = (overContent - 1) * headerLength;
        const textLength  = (textWidth - headerLength) + overHeader + calcAnsiLengthValue;

        let fixedText = [];

        if(textLength <= width){
            const prefix = " ".repeat(index === 0?0:headerLength)
            fixedTextList.push(`${prefix}${text}`);
            continue;
        }

        // 横幅より長かったら...
        for(let i = 0; i < textLength;){
            const prefix = " ".repeat(i >= width?headerLength:0);
            const end = width + (i >= width? -headerLength:calcAnsiLengthValue);

            const tmp = `${prefix}${text.slice(i, i + end)}`;
            fixedText.push(tmp);
            i += width;
        }
        fixedTextList = fixedTextList.concat(fixedText);
    }
    return fixedTextList;
}

export type LoggerCreateData = {
    type:string;
    message:string;
    createMessage:string;
    date:number;
}
type LogType =
    "INFO"
    |"WARN"
    |"ERROR"
    |"SUCCESS"
    |"PROCESS"
    |"MESSAGE"
    |"SYSTEM"
    |"BER";


class Logger{

    private createLog(
        type:LogType,
        message:string,
        label:string
    ):LoggerCreateData{
        return {
            type,
            message:`[${type}] ${message}`,
            createMessage:`${label} ${message}`,
            date: Date.now()
        }
    }

    #addStdout(obj:LoggerCreateData){
        const {createMessage,...stdoutObj } = obj;
        process.stdout.write(JSON.stringify(stdoutObj));
    }
    #addStderr(message:string){
        const out = message.endsWith("\n") ? message : message + "\n";
        process.stderr.write(out);
    }
    #loggerSelectProcess(data:LoggerCreateData){
        if((process.stdout.isTTY)){
            this.#addStderr(data.createMessage);
        }else{
            this.#addStdout(data);
        }

        return data;
    }

    info(message: string):LoggerCreateData{
        const data = this.createInfo(message);
        return this.#loggerSelectProcess(data);
    }
    createInfo(message: string):LoggerCreateData{
        const type:LogType = "INFO";  
        return this.createLog(type,message,pc.blueBright(`[${type}]`));
    }

    warn(message: string):LoggerCreateData{
        const data = this.createWarn(message);
        return this.#loggerSelectProcess(data);
    }
    createWarn(message: string):LoggerCreateData{
        const type:LogType = "WARN";  
        return this.createLog(type,message,pc.yellow(`[${type}]`));
    }

    error(message: string):LoggerCreateData{

        const data = this.createError(message);

        return this.#loggerSelectProcess(data);
    }
    createError(message: string):LoggerCreateData{
        const type:LogType = "ERROR";  
        return this.createLog(type,message,pc.red(`[${type}]`));
    }

    success(message: string):LoggerCreateData{
        const data = this.createSuccess(message);
        return this.#loggerSelectProcess(data);
    }
    createSuccess(message: string):LoggerCreateData{
        const type:LogType = "SUCCESS";  
        return this.createLog(type,message,pc.green(`[${type}]`));
    }

    process(message: string):LoggerCreateData{
        const data = this.createProcess(message);
        return this.#loggerSelectProcess(data);
    }
    createProcess(message: string):LoggerCreateData{
        const type:LogType = "PROCESS";  
        return this.createLog(type,message,pc.magentaBright(`[${type}]`));
    }

    message(message: string):LoggerCreateData{
        const data = this.createMessage(message);
        return this.#loggerSelectProcess(data);
    }
    createMessage(message: string):LoggerCreateData{
        const type:LogType = "MESSAGE";  
        return this.createLog(type,message,pc.gray(`[${type}]`));
    }

    system(message: string):LoggerCreateData{
        const data = this.createSystem(message);
        return this.#loggerSelectProcess(data);
    }
    createSystem(message: string):LoggerCreateData{
        const type:LogType = "SYSTEM";  
        return this.createLog(type,message,pc.magentaBright(`[${type}]`));
    }

    bar():LoggerCreateData{
        const data = this.createBar();
        return this.#loggerSelectProcess(data);
    }
    createBar():LoggerCreateData{
        const width = getWidth();
        const message = `${"─".repeat(width - 2)}`;

        const type:LogType = "BER";  
        return this.createLog(type,message,pc.blueBright(`[${type}]`));
    }

    window(window:{
        title:string;
        content:LoggerCreateData[];
    }):void{

        if(!(process.stdout.isTTY)){
            window.content.forEach((data)=>{
                this.#loggerSelectProcess(data)
            });
            return;
        }

        const width = getWidth();
        const createLine = (line:string):string => {
            const repeatNumber = (width - 2) - stringWidth(line);
            const safeRepeatNumber = repeatNumber >= 0 ? repeatNumber : 0;
            return `│${line}${" ".repeat(safeRepeatNumber)}│`;
        }

        this.#addStderr(`┌${"─".repeat(width - 2)}┐`);

        textNormalizer(window.title,(width - 2))
            .forEach((text)=>{
                this.#addStderr(createLine(text));
        });

        this.#addStderr(`├${"─".repeat(width - 2)}┤`);

        window.content.
            forEach((lineText)=>{
                textNormalizer(lineText.createMessage,(width - 2)).
                    forEach((text)=>{
                        this.#addStderr(createLine(text));
                });
        });

        this.#addStderr(`└${"─".repeat(width - 2)}┘`);
    }
}

export const logger = new Logger();