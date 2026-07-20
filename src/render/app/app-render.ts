import readline from "readline";

export class Renderer {
    private beforeIndex: number = 0;
    private printData: string[] = [];

    print(): void {
        this.clear();

        for (const message of this.printData) {
            process.stdout.write(`${message}\n`);
        }

        this.beforeIndex = this.printData.length;
    }
    clear(): void {
        // index の行へ移動
        for (let i = 0; i < this.beforeIndex; i++) {
            readline.moveCursor(process.stdout, 0, -1);
            readline.cursorTo(process.stdout, 0);
            readline.clearLine(process.stdout, 0);
        }

        this.beforeIndex = 0;
    }

    set(printData: string): void {
        this.printData = printData.split("\n");
    }
}
