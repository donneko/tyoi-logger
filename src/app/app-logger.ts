import pc from "picocolors";
import stringWidth from "string-width";
import { textNormalizer } from "../service/text-normalizer.js"
import { getWidth } from "../service/get-width.js"
import { logSelectProcess } from "../service/log-select-process.js"
import { writeStderr } from "../service/write-stderr.js"
import type { LogType , LoggerCreateData } from "../types/logger.js"

export class Logger{

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

    info = (message: string):LoggerCreateData => {
        const data = this.createInfo(message);
        logSelectProcess(data);
        return data;
    }
    createInfo = (message: string):LoggerCreateData => {
        const type:LogType = "INFO";  
        return this.createLog(type,message,pc.blueBright(`[${type}]`));
    }

    warn = (message: string):LoggerCreateData => {
        const data = this.createWarn(message);
        logSelectProcess(data);
        return data;
    }
    createWarn = (message: string):LoggerCreateData => {
        const type:LogType = "WARN";  
        return this.createLog(type,message,pc.yellow(`[${type}]`));
    }

    error = (message: string):LoggerCreateData => {
        const data = this.createError(message);
        logSelectProcess(data);
        return data;
    }
    createError = (message: string):LoggerCreateData => {
        const type:LogType = "ERROR";  
        return this.createLog(type,message,pc.red(`[${type}]`));
    }

    success = (message: string):LoggerCreateData => {
        const data = this.createSuccess(message);
        logSelectProcess(data);
        return data;
    }
    createSuccess = (message: string):LoggerCreateData => {
        const type:LogType = "SUCCESS";  
        return this.createLog(type,message,pc.green(`[${type}]`));
    }

    process = (message: string):LoggerCreateData => {
        const data = this.createProcess(message);
        logSelectProcess(data);
        return data;
    }
    createProcess = (message: string):LoggerCreateData => {
        const type:LogType = "PROCESS";  
        return this.createLog(type,message,pc.magentaBright(`[${type}]`));
    }

    message = (message: string):LoggerCreateData => {
        const data = this.createMessage(message);
        logSelectProcess(data);
        return data;
    }
    createMessage = (message: string):LoggerCreateData => {
        const type:LogType = "MESSAGE";  
        return this.createLog(type,message,pc.gray(`[${type}]`));
    }

    system = (message: string):LoggerCreateData => {
        const data = this.createSystem(message);
        logSelectProcess(data);
        return data;
    }
    createSystem = (message: string):LoggerCreateData => {
        const type:LogType = "SYSTEM";  
        return this.createLog(type,message,pc.magentaBright(`[${type}]`));
    }

    bar = ():LoggerCreateData => {
        const data = this.createBar();
        logSelectProcess(data);
        return data;
    }
    createBar = ():LoggerCreateData => {
        const width = getWidth();
        const message = `${"─".repeat(width - 2)}`;

        const type:LogType = "BAR";  
        return this.createLog(type,message,pc.blueBright(`[${type}]`));
    }

    private createLine(line:string):string{
        const width = getWidth();
        const repeatNumber = (width - 2) - stringWidth(line);
        const safeRepeatNumber = repeatNumber >= 0 ? repeatNumber : 0;
        return `│${line}${" ".repeat(safeRepeatNumber)}│`;
    }

    window = (window:{
        title:string;
        content:LoggerCreateData[];
    }):void =>{

        if(!(process.stdout.isTTY)){
            window.content.forEach((data)=>{
                logSelectProcess(data);
            });
            return;
        }

        const width = getWidth() - 2;
        const output:string[] = [];

        output.push(`┌${"─".repeat(width)}┐`);

        textNormalizer(window.title,(width))
        .forEach((text)=>{
            output.push(this.createLine(text));
        });

        output.push(`├${"─".repeat(width)}┤`);

        window.content.
        forEach((lineText)=>{
            textNormalizer(lineText.createMessage,(width))
            .forEach((text)=>{
                output.push(this.createLine(text));
            });
        });

        output.push(`└${"─".repeat(width)}┘`);

        // outputの行をcliに出す
        output.forEach(o => writeStderr(o));
    }
}