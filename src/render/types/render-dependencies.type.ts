export type RenderAllDependencies = RenderWriteDependencies;

export type RenderWriteDependencies = {
    processStderrWrite: (text: string) => void;
    processStdoutWrite: (text: string) => void;
};
