import Tokenizer from "../libs/Tokenizer";

export default abstract class ASTNode {
    private static nextId: number = 555;
    private weirdId: number = 0;

    public getId(): number{
        if(this.weirdId === 0) this.weirdId = ASTNode.nextId++;
        return this.weirdId;
    }


    protected static getTokenizer() {
        return Tokenizer.getTokenizer();
    }

    public abstract parseNode(): void;

    public abstract evaluateNode(): any | void;
}
