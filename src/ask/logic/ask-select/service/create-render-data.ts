export function createRenderData(
    message: string,
    selects: string[],
    cursorIndex: number
): string[] {
    const logLine = [];

    logLine.push(message);

    selects.forEach((select, index) => {
        const cursor = index === cursorIndex ? "❯ " : "  ";
        const line = `${cursor}${select}`;
        logLine.push(line);
    });

    return logLine;
}
