module SimpleTablePlugin {
    export interface ISimpleTablePlugin {
        // Attributes
        isInitializationComplete:boolean;
        simpleTable:any;

        // Methods
        init():void;
        isInitialized():boolean;
        doRegister():void;
        onRegistered(simpleTable:any):void;
    }
}