module SimpleTablePlugin {
    export interface ISimpleTablePlugin {
        // Attributes
        isInitializationComplete:boolean;
        simpleTable:any;
        parent:any;

        // Methods
        init():void;
        isInitialized():boolean;
        doRegister(parent?:any):void;
        onRegistered(simpleTable:any):void;
    }
}