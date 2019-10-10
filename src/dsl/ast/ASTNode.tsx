export default abstract class ASTNode{
    public abstract parseNode(): void;
    public abstract evaluateNode(): any|void;
}
