import STATEMENT from "./STATEMENT";
import ParsingException from "../exception/ParsingException";
import ASTNode from "./ASTNode";
import ObjectsTable from "../libs/ObjectsTable";
import ObjectNotExistsError from "../exception/ObjectNotExistsError";

/**
 * Represents
 * ADD x x2 x3 to y
 *
 * Will lookup x x2 x3 in the symbols table and add them to y
 */
export default class ADD extends STATEMENT {
    private child: string;
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
        let to = tokenizer.getNext();
        if (to === "!to") {
            throw new ParsingException();
        }
        this.parent = tokenizer.getNext();
    }

    public evaluateNode(): void {
        const createdObject = ObjectsTable.creates.get(this.parent);
        if (!createdObject) {
            throw new ObjectNotExistsError();
        }
        // TODO: do more type checking here
        if (this.child.includes("'") || this.child.includes("\"")) {
            this.child = this.child.replace(/\'/g, "").replace(/"/g, "");
        }
        createdObject.attributes = this.child;
        return;
    }
}
