import ASTNode from "./ASTNode";
import Page from "../../containers/Page";
import React from "react";
import ADD from "./ADD";

export default abstract class STATEMENT extends ASTNode{

    /**
     * Returns either ADD or CREATE depending on next token
     */
    public static getNextStatment(): STATEMENT{
        return new ADD();
    }
}
