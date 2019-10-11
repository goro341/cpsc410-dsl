import ASTNode from "../ASTNode";
import ObjectNode from "./ObjectNode";
import PAGE from "./PAGE";
import HEADER from "./HEADER";
import TEXT from "./TEXT";

export default abstract class ObjNodeFactory{
    public static getObjNode(type: string, name: string): ObjectNode|null {
        switch (type) {
            case 'PAGE':
                return new PAGE(name);
            case 'HEADER':
                return new HEADER(name);
            case 'TEXT':
                return new TEXT(name);
            default:
                return null;
        }
    }
}

