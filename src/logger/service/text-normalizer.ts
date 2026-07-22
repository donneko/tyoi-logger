import stringWidth from "string-width";
import stripAnsi from "strip-ansi";

const graphemeSegmenter = new Intl.Segmenter();

// Matches CSI escape sequences used for terminal styling. Keeping these tokens
// separate prevents a wrap from slicing an ANSI sequence in half.
const ansiPattern = new RegExp(
    // eslint-disable-next-line no-control-regex
    "^(?:(?:\\u001B\\][\\s\\S]*?(?:\\u0007|\\u001B\\u005C|\\u009C))|[\\u001B\\u009B][[\\]\\()#;?]*(?:\\d{1,4}(?:[;:]\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~])"
);

function tokenize(text: string): string[] {
    const tokens: string[] = [];

    for (let index = 0; index < text.length;) {
        const ansi = text.slice(index).match(ansiPattern)?.[0];
        if (ansi) {
            tokens.push(ansi);
            index += ansi.length;
            continue;
        }

        const nextEscape = text.indexOf("\u001b", index);
        const plainEnd = nextEscape === -1 ? text.length : nextEscape;

        // Unknown escape sequences must still advance the cursor.
        if (plainEnd === index) {
            tokens.push(text[index] ?? "");
            index += 1;
            continue;
        }

        const plainText = text.slice(index, plainEnd);

        for (const { segment } of graphemeSegmenter.segment(plainText)) {
            tokens.push(segment);
        }

        index = plainEnd;
    }

    return tokens;
}

function wrapLine(
    text: string,
    width: number,
    initialIndent: string,
    continuationIndent: string
): string[] {
    if (text.length === 0) {
        return [initialIndent];
    }

    const lines: string[] = [];
    let line = initialIndent;
    let lineWidth = stringWidth(initialIndent);
    let pendingAnsi = "";

    for (const token of tokenize(text)) {
        const tokenWidth = stringWidth(token);

        if (tokenWidth === 0) {
            pendingAnsi += token;
            continue;
        }

        if (lineWidth > 0 && lineWidth + tokenWidth > width) {
            lines.push(line);
            line = continuationIndent;
            lineWidth = stringWidth(continuationIndent);
        }

        line += pendingAnsi + token;
        pendingAnsi = "";
        lineWidth += tokenWidth;
    }

    // Preserve trailing reset/style sequences even when they have no width.
    line += pendingAnsi;
    lines.push(line);
    return lines;
}

export function textNormalizer(text: string, width: number): string[] {
    if (width <= 0) {
        return [];
    }

    const textList = text.split("\n");
    const headerLength = stringWidth(
        stripAnsi(textList[0] ?? "").match(/^\[[a-zA-Z0-9]+\]\s/)?.[0] ?? ""
    );
    const continuationIndent = headerLength < width ? " ".repeat(headerLength) : "";

    return textList.flatMap((line, index) => {
        const initialIndent = index === 0 ? "" : continuationIndent;
        return wrapLine(line, width, initialIndent, continuationIndent);
    });
}
