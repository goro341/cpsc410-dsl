import ASTNode from "./ASTNode";
import * as React from "react";
import STATEMENT from "./STATEMENT";

/**
 * Represents
 * CREATE (...) t
 *
 * Will register t in the symbols table with the content being the comp/page that has been defined
 */
export default class CREATE extends STATEMENT{

    public parseNode(): void {
    }

    public evaluateNode(): void{
        return;
    }
}
