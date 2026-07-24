export type AskAllDependencies = AskWriteDependencies;

export type AskWriteDependencies = {
    processStderrWrite: (text: string) => void;
    processStdoutWrite: (text: string) => void;
};
