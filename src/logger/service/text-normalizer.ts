import stringWidth from "string-width";
import stripAnsi from "strip-ansi";

function calcAnsiLength(text:string){
    const cleanText =  stripAnsi(text);
    const ansiLength = (text.length - cleanText.length);
    return ansiLength;
}

export function textNormalizer(text:string,width:number):string[] {

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