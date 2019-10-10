import ASTNode from "./ASTNode";
import * as React from "react";
import STATEMENT from "./STATEMENT";
import Tokenizer from "../libs/Tokenizer";

/**
 * Represents
 * CREATE (...) t
 *
 * Will register t in the symbols table with the content being the comp/page that has been defined
 */
export default class CREATE extends STATEMENT{
    private type: string;
    private name: string;


    constructor() {
        super();
        this.type = "";
        this.name = "";
    }

    public parseNode(): void {
        Tokenizer.getAndCheckNext(/CREATE/g);
        this.type = Tokenizer.getNext();
        this.name = Tokenizer.getNext();
    }

    public evaluateNode(): void{
        return;
    }
}
