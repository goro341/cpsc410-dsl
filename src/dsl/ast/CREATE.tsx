import ASTNode from "./ASTNode";
import * as React from "react";
import STATEMENT from "./STATEMENT";
import Tokenizer from "../libs/Tokenizer";
import ObjectNode from "./obj/ObjectNode";
import ObjectTypeNotExistsError from "../exception/ObjectTypeNotExistsError";
import ObjectsTable from "../libs/ObjectsTable";

/**
 * Represents
 * CREATE (...) t
 *
 * Will register t in the symbols table with the content being the comp/page that has been defined
 */
export default class CREATE extends STATEMENT {
    private type: string;
    private name: string;


    constructor() {
        super();
        this.type = "";
        this.name = "";
    }

    public parseNode(): void {
        CREATE.tokenizer.getAndCheckNext('/CREATE/g');
        this.type = CREATE.tokenizer.getNext();
        this.name = CREATE.tokenizer.getNext();
    }

    public evaluateNode(): void {
        const obj: ObjectNode | null = ObjectNode.getObjNode(this.type);
        if (obj === null) throw new ObjectTypeNotExistsError();
        ObjectsTable.putObject(this.name, obj);
    }
}
