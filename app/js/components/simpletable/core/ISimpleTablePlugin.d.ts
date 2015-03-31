declare module SimpleTablePlugin {
    interface ISimpleTablePlugin {
        isInitializationComplete: boolean;
        simpleTable: any;
        init(): void;
        isInitialized(): boolean;
        doRegister(): void;
        onRegistered(simpleTable: any): void;
    }
}
