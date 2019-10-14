import STATEMENT from "./STATEMENT";
import ASTNode from "./ASTNode";
import ParsingException from "../exception/ParsingException";
import ObjectNode from "./obj/ObjectNode";
import ObjectsTable from "../libs/ObjectsTable";
import ObjectNotExistsError from "../exception/ObjectNotExistsError";

export default class ADD_LIT extends STATEMENT {
    private item: string;
    constructor() {
        super();
        this.item = "";
    }

    public parseNode(): void {
        this.item = ADD_LIT.getTokenizer().getNext();
    }

    public evaluateNode(): Promise<ObjectNode|string> {
        if (this.item.startsWith("\"") && this.item.endsWith("\"")) {
            return Promise.resolve(this.item.replace(/"/g, ""));
        } else {
            let c: ObjectNode|undefined = ObjectsTable.getObject(this.item);
            if (!c) {
                return Promise.reject(new ObjectNotExistsError());
            }
            return Promise.resolve(c);
        }
    }
}
