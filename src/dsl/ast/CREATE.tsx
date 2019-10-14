import STATEMENT from "./STATEMENT";
import * as React from 'react';
import ObjectNode from "./obj/ObjectNode";
import ObjectTypeNotExistsError from "../exception/ObjectTypeNotExistsError";
import ObjectsTable from "../libs/ObjectsTable";
import ASTNode from "./ASTNode";
import Header from "../../components/Header";
import ObjNodeFactory from "./obj/ObjNodeFactory";
import VariableNameAlreadyExists from "../exception/VariableNameAlreadyExists";

/**
 * Represents
 * CREATE (...) t
 *
 * Will register t in the symbols table with the content being the comp/page that has been defined
 */
export default class CREATE extends STATEMENT {
    protected type: string;
    protected name: string;

    constructor() {
        super();
        this.type = "";
        this.name = "";
    }

    public parseNode(): void {
        const tokenizer = ASTNode.getTokenizer();
        tokenizer.getAndCheckNext('CREATE');
        this.type = tokenizer.getNext();
        this.name = tokenizer.getNext();
    }

    public evaluateNode(): Promise<void> {
        const node: ObjectNode|null = ObjNodeFactory.getObjNode(this.type, this.name);
        if(node === null) throw new ObjectTypeNotExistsError();
        if(ObjectsTable.hasObject(this.name)) throw new VariableNameAlreadyExists();
        ObjectsTable.putObject(this.name, node);
        return Promise.resolve();
    }
}
