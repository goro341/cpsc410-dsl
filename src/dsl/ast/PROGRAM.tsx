import ASTNode from "./ASTNode";
import * as React from "react";
import STATEMENT from "./STATEMENT";

/**
 * Represents
 * entire program
 * this should always be root in AST
 **/
export default class PROGRAM extends ASTNode{

    public parseNode(): void {
    }

    public evaluateNode(): JSX.Element|void {
        // this method is tricky because the PROGRAM should basically eval all sub components
        // then return the composition of all PAGE items in the symbols table, with some React code to seperate pages
        // but for now I guess just compose all pages
        return (<p>hey</p>);
    }
}
