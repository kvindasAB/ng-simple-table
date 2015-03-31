/// <reference path="ISimpleTablePlugin.d.ts" />
declare module SimpleTablePlugin {
    class BaseSimpleTablePlugin implements SimpleTablePlugin.ISimpleTablePlugin {
        isInitializationComplete: boolean;
        simpleTable: any;
        init(): void;
        doRegister(): void;
        onRegistered(simpleTable: any): void;
        isInitialized(): boolean;
        addEventListeners(): void;
        removeEventListeners(): void;
    }
}
