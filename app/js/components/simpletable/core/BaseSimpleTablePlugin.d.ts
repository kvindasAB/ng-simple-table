/// <reference path="ISimpleTablePlugin.d.ts" />
declare module SimpleTablePlugin {
    class BaseSimpleTablePlugin implements SimpleTablePlugin.ISimpleTablePlugin {
        isInitializationComplete: boolean;
        simpleTable: any;
        parent: any;
        init(): void;
        doRegister(parent?: any): void;
        onRegistered(simpleTable: any): void;
        isInitialized(): boolean;
        addEventListeners(): void;
        removeEventListeners(): void;
        notifyListener(eventName: string, params: any): void;
    }
}
