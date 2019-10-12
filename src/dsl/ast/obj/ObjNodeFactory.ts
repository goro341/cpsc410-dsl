import ASTNode from "../ASTNode";
import ObjectNode from "./ObjectNode";
import PAGE from "./PAGE";
import HEADER from "./HEADER";
import TEXT from "./TEXT";
import LINK from "./LINK";
import TABLE from "./TABLE";
import ROW from "./ROW";

export default abstract class ObjNodeFactory{
    public static getObjNode(type: string, name: string): ObjectNode|null {
        switch (type) {
            case 'PAGE':
                return new PAGE(name);
            case 'HEADER':
                return new HEADER(name);
            case 'TEXT':
                return new TEXT(name);
            case 'LINK':
                return new LINK(name);
            case 'TABLE':
                return new TABLE(name);
            case 'ROW':
                return new ROW(name);
            default:
                return null;
        }
    }
}

