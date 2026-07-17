export function writeStderr(message:string){
    const line    = message.endsWith("\n")? 
        message:
        message + "\n";

    process.stderr.write(line);
}
