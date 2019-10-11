import ASTNode from "./ASTNode";
import Page from "../../containers/Page";
import React from "react";
import ADD from "./ADD";
import Tokenizer from "../libs/Tokenizer";
import CREATE from "./CREATE";

export default abstract class STATEMENT extends ASTNode{

    /**
     * Returns either ADD or CREATE depending on next token
     */
    public static getNextStatment(): STATEMENT|null{
        switch (STATEMENT.tokenizer.getNext()) {
            case "CREATE":
                return new CREATE();
            case "ADD":
                return new ADD();
            default:
                return null;
        }
    }
}
