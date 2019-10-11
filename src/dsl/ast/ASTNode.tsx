import Tokenizer from "../libs/Tokenizer";

export default abstract class ASTNode {
    protected static tokenizer = Tokenizer.getTokenizer();

    public abstract parseNode(): void;

    public abstract evaluateNode(): any | void;
}