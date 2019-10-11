import STATEMENT from "./STATEMENT";
import ParsingException from "../exception/ParsingException";
import ASTNode from "./ASTNode";
import ObjectsTable from "../libs/ObjectsTable";
import ObjectNotExistsError from "../exception/ObjectNotExistsError";
import ObjectNode from "./obj/ObjectNode";

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
        if (to === "!to") { //FIXME not sure what this does?
            throw new ParsingException();
        }
        this.parent = tokenizer.getNext();
    }

    public evaluateNode(): void {
        const parentObject: ObjectNode|undefined = ObjectsTable.getObject(this.parent);
        if (!parentObject) {
            throw new ObjectNotExistsError();
        }
        //TODO support multi adding!
        // TODO: do more type checking here
        if (this.child.includes("'") || this.child.includes("\"")) {
            this.child = this.child.replace(/\'/g, "").replace(/"/g, "");
            parentObject.addChild(this.child);
        } else {
            const childObj: ObjectNode|undefined = ObjectsTable.getObject(this.child);
            if (!childObj) {
                throw new ObjectNotExistsError();
            }
            parentObject.addChild(childObj);
        }
        return;
    }
}
