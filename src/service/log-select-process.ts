import { writeStderr } from "./write-stderr.js";
import { writeStdout } from "./write-stdout.js";
import type { LoggerCreateData } from "../types/logger.js";

export function logSelectProcess(logData:LoggerCreateData){
    if((process.stdout.isTTY)){
        const message = logData.createMessage;
        const line    = message.endsWith("\n")? 
            message:
            message + "\n";

        writeStderr(line);
    }else{
        writeStdout(logData);
    }
}