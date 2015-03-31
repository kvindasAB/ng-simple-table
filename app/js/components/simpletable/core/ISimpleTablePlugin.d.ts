declare module SimpleTablePlugin {
    interface ISimpleTablePlugin {
        isInitializationComplete: boolean;
        simpleTable: any;
        parent: any;
        init(): void;
        isInitialized(): boolean;
        doRegister(parent?: any): void;
        onRegistered(simpleTable: any): void;
    }
}
