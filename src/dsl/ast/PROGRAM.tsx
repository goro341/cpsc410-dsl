import ASTNode from "./ASTNode";
import * as React from "react";
import STATEMENT from "./STATEMENT";
import ObjectsTable from "../libs/ObjectsTable";
import PAGE from "./obj/PAGE";
import Tokenizer from "../libs/Tokenizer";
import ParsingException from "../exception/ParsingException";

/**
 * Represents
 * entire program
 * this should always be root in AST
 **/
export default class PROGRAM extends ASTNode{
    private statements: STATEMENT[];


    constructor() {
        super();
        this.statements = [];
    }

    public parseNode(): void {
        while(Tokenizer.hasMore()){
            const s: STATEMENT|null = STATEMENT.getNextStatment();
            if(s === null) throw new ParsingException();
            s.parseNode();
            this.statements.push(s)
        }
    }

    public evaluateNode(): JSX.Element {
        this.statements.forEach(s => s.evaluateNode()); // runs first stage eval which generates tree

        let arr = [];
        let it = ObjectsTable.getAllObjects();
        let result = it.next();
        while (!result.done) {

            result = it.next();
            if(result.value[1] instanceof PAGE){
                arr.push(result.value[1].evaluateNode()); // needs some routing logic around it
            }
        }

        // this method is tricky because the PROGRAM should basically eval all sub components
        // then return the composition of all PAGE items in the symbols table, with some React code to seperate pages
        // but for now I guess just compose all pages
        return (<div>{arr}</div>);
    }
}
