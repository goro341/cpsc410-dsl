import STATEMENT from "./STATEMENT";
import * as React from 'react';
import ObjectNode from "./obj/ObjectNode";
import ObjectTypeNotExistsError from "../exception/ObjectTypeNotExistsError";
import ObjectsTable from "../libs/ObjectsTable";
import ASTNode from "./ASTNode";
import Header from "../../components/Header";
import ObjNodeFactory from "./obj/ObjNodeFactory";
import VariableNameAlreadyExists from "../exception/VariableNameAlreadyExists";
import CREATE from "./CREATE";

/**
 * Represents
 * LOAD (...) t
 *
 */
export default class LOAD extends ASTNode{
    private name: string;
    private thingToLoad: string;


    constructor() {
        super();
        this.name = "";
        this.thingToLoad = "";
    }

    public parseNode(): void {
        const tokenizer = ASTNode.getTokenizer();
        tokenizer.getAndCheckNext('LOAD');
        this.thingToLoad = tokenizer.getNext();
        tokenizer.getAndCheckNext('with');
        this.name = tokenizer.getNext();
    }

    public evaluateNode(): void {
        // to evaluate this node we need to some super fancy stuff
        // right now I will just ignore it
    }
}
