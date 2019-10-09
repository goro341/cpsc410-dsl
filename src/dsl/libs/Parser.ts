import PROGRAM from "../ast/PROGRAM";
import ASTNode from "../ast/ASTNode";

export default class Parser{
    public static parse(): ASTNode{
        const p: PROGRAM = new PROGRAM();
        p.parseNode();
        return p;
    }
}
