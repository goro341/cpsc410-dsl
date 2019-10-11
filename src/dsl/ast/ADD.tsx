import STATEMENT from "./STATEMENT";
import ParsingException from "../exception/ParsingException";
import ASTNode from "./ASTNode";

/**
 * Represents
 * ADD x x2 x3 to y
 *
 * Will lookup x x2 x3 in the symbols table and add them to y
 */
export default class ADD extends STATEMENT{
    private child :  string;
    private parent: string;

    constructor() {
        super();
        this.child = "";
        this.parent = "";
    }
    public parseNode(): void {
        const tokenizer = ASTNode.getTokenizer();
        tokenizer.getAndCheckNext('ADD');
        this.child = tokenizer.getNext();
        let to:any = tokenizer.getNext();
        if (to === "!to") {
            throw new ParsingException();
        }
        this.parent = tokenizer.getNext();
    }

    public evaluateNode(): void {
        return;
    }
}
