/// <reference path="../table/SimpleTable.ts" />
module STUtil {
    export class Util {

        static generateToken(len:number = 8):string{
            var id = (Math.random() + 1).toString(36).substring(2,2+len);
            return id;
        }

    }
}