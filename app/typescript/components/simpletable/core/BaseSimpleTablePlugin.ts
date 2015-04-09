/// <reference path="ISimpleTablePlugin.ts" />
module SimpleTablePlugin {
    export class BaseSimpleTablePlugin implements SimpleTablePlugin.ISimpleTablePlugin {
        // Attributes
        isInitializationComplete:boolean = false;
        simpleTable:any;
        parent:any;

        // Methods
        init():void {
            this.addEventListeners();
        }

        doRegister(parent?:any):void{
            this.parent = parent ? parent : this.parent;
            this.parent.registerPlugin(this);
        }
        onRegistered(simpleTable:any):void{
            this.simpleTable = simpleTable;
            this.init();
            this.isInitializationComplete = true;
        }
        isInitialized():boolean {
            return this.isInitializationComplete;
        }

        addEventListeners():void {
        }

        removeEventListeners():void {
        }

        notifyListener(eventName:string, params:any):void {
            if(!this.simpleTable){ return; }
            this.simpleTable.notifyListener(eventName, params);
        }

    }
}