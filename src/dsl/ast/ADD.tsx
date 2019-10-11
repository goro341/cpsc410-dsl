import * as React from "react";
import STATEMENT from "./STATEMENT";
import ParsingException from "../exception/ParsingException";

/**
 * Represents
 * ADD x x2 x3 to y
 *
 * Will lookup x x2 x3 in the symbols table and add them to y
 */
export default class ADD extends STATEMENT{
    private child :  string;
    private parent: string;

    constructor() {
        super();
        this.child = "";
        this.parent = "";
    }
    public parseNode(): void {
        ADD.tokenizer.getAndCheckNext('/ADD/g');
        this.child = ADD.tokenizer.getNext();
        let to:any = ADD.tokenizer.getNext();
        if (to === "!to") {
            throw new ParsingException();
        }
        this.parent = ADD.tokenizer.getNext();
    }

    public evaluateNode(): void {
        return;
    }
}
