import STATEMENT from "./STATEMENT";
import ParsingException from "../exception/ParsingException";
import ASTNode from "./ASTNode";
import ObjectsTable from "../libs/ObjectsTable";
import ObjectNotExistsError from "../exception/ObjectNotExistsError";
import ObjectNode from "./obj/ObjectNode";
import ADDLIT from "./ADD_LIT";

/**
 * Represents
 * ADD x x2 x3 to y
 *
 * Will lookup x x2 x3 in the symbols table and add them to y
 */
export default class ADD extends STATEMENT {
    private children: ADDLIT[];
    private parent: string;

    constructor() {
        super();
        this.children = [];
        this.parent = "";
    }

    public parseNode(): void {
        const tokenizer = ASTNode.getTokenizer();
        tokenizer.getAndCheckNext('ADD');
        while(!tokenizer.checkToken('to')){
            if(tokenizer.checkToken('ADD') || tokenizer.checkToken('CREATE')){ // grace failure
                throw new ParsingException();
            }
            const addlit: ADDLIT = new ADDLIT();
            addlit.parseNode();
            this.children.push(addlit);
            if(tokenizer.checkToken("\,")) tokenizer.getNext();
        }
        tokenizer.getNext(); // to
        this.parent = tokenizer.getNext();
    }

    public evaluateNode(): Promise<void> {
        const parentObject: ObjectNode|undefined = ObjectsTable.getObject(this.parent);
        if (!parentObject) {
            throw new ObjectNotExistsError();
        }
        // TODO: do more type checking here
        let p: Promise<ObjectNode|string>[] = [];
        this.children.forEach(async (child: ADDLIT) => {
            let n = child.evaluateNode();
            p.push(n);
            parentObject.addChild(await n);
        });

        return Promise.all(p).then();
    }
}
