import STATEMENT from "./STATEMENT";
import * as React from 'react';
import ObjectNode from "./obj/ObjectNode";
import ObjectTypeNotExistsError from "../exception/ObjectTypeNotExistsError";
import ObjectsTable from "../libs/ObjectsTable";
import ASTNode from "./ASTNode";
import Header from "../../components/Header";

/**
 * Represents
 * CREATE (...) t
 *
 * Will register t in the symbols table with the content being the comp/page that has been defined
 */
export default class CREATE extends STATEMENT {
    private type: string;
    private name: string;
    public attributes: any; // TODO: use a better design

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

    public evaluateNode(): JSX.Element {
        ObjectsTable.creates.set(this.name, this);
        if (this.type === 'HEADER') {
            return <Header name={this.attributes}/>
        }
        return <div></div>
        // const obj: ObjectNode | null = ObjectNode.getObjNode(this.type);
        // if (obj === null) throw new ObjectTypeNotExistsError();
        // ObjectsTable.putObject(this.name, obj);
    }
}
