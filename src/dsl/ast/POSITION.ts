import STATEMENT from "./STATEMENT";
import ParsingException from "../exception/ParsingException";
import ASTNode from "./ASTNode";

export default class POSITION extends STATEMENT {
    private element: string;
    private place: string;

    constructor() {
        super();
        this.element = "";
        this.place = "";
    }

    public parseNode(): void {
        const tokenizer = ASTNode.getTokenizer();
        tokenizer.getAndCheckNext('POSITION');
        this.element = tokenizer.getNext();
        let to = tokenizer.getNext();
        if (to !== "to") {
            throw new ParsingException();
        }
        this.place = tokenizer.getNext();
    }

    public evaluateNode(): Promise<void> {
        return Promise.resolve();
    }
}
