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
    private children: string[];
    private parent: string;

    constructor() {
        super();
        this.children = [];
        this.parent = "";
    }

    public parseNode(): void {
        const tokenizer = ASTNode.getTokenizer();
        tokenizer.getAndCheckNext('ADD');
        let next;
        while((next = tokenizer.getNext()) !== "to"){
            if(next === "ADD" || next === "CREATE"){ // grace failure
                throw new ParsingException();
            }
            this.children.push(next);
            if(tokenizer.checkToken("\,")) tokenizer.getNext();
        }
        this.parent = tokenizer.getNext();
    }

    public evaluateNode(): void {
        const parentObject: ObjectNode|undefined = ObjectsTable.getObject(this.parent);
        if (!parentObject) {
            throw new ObjectNotExistsError();
        }
        // TODO: do more type checking here
        this.children.forEach((child: string) => {
            console.log(child);
            let childObj: string|ObjectNode;
            if (child.includes("'") || child.includes("\"")) {
                childObj = child.replace(/\'/g, "").replace(/"/g, "");
            } else {
                let c: ObjectNode|undefined = ObjectsTable.getObject(child);
                if (!c) {
                    throw new ObjectNotExistsError();
                }
                childObj = c;
            }
            parentObject.addChild(childObj);
        });

        return;
    }
}
