import ASTNode from "./ASTNode";
import * as React from "react";
import STATEMENT from "./STATEMENT";
import Tokenizer from "../libs/Tokenizer";

/**
 * Represents
 * ADD x x2 x3 to y
 *
 * Will lookup x x2 x3 in the symbols table and add them to y
 */
export default class ADD extends STATEMENT {

    public parseNode(): void {
        ADD.tokenizer.getAndCheckNext('/ADD/g');
    }

    public evaluateNode(): void {
        return;
    }
}