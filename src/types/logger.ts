export type LoggerCreateData = {
    type:string;
    message:string;
    createMessage:string;
    date:number;
}
export type LogType =
    "INFO"
    |"WARN"
    |"ERROR"
    |"SUCCESS"
    |"PROCESS"
    |"MESSAGE"
    |"SYSTEM"
    |"BER";
