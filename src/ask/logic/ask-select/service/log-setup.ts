export function logSetup(keySelect: (key: string) => void) {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", keySelect);
}
