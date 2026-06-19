

export function writeStdout(object:object){
    process.stdout.write(JSON.stringify(object));
}