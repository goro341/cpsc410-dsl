import PROGRAM from "../ast/PROGRAM";
import ASTNode from "../ast/ASTNode";

export default class Executor{

    public static execute(root: ASTNode): JSX.Element{
        //TODO init symbols table here, make a new class for that
        return <JSX.Element>root.evaluateNode();
    }
}
