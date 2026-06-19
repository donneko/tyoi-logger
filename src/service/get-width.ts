export function getWidth():number{
    const number = Number(process.env.COLUMNS);
    const envColumns = Number.isFinite(number)? number : null;

    return process.stdout.columns ??
        envColumns ??
        80;
}