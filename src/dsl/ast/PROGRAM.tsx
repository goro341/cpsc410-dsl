import ASTNode from "./ASTNode";
import * as React from "react";
import STATEMENT from "./STATEMENT";
import ObjectsTable from "../libs/ObjectsTable";
import PAGE from "./obj/PAGE";
import ParsingException from "../exception/ParsingException";
import CREATE from "./CREATE";
import ADD from "./ADD";
import POSITION from "./POSITION";
import BUILD from "./BUILD";

/**
 * Represents
 * entire program
 * this should always be root in AST
 **/
export default class PROGRAM extends ASTNode {
    private statements: STATEMENT[];

    constructor() {
        super();
        this.statements = [];
    }

    /**
     * Returns either ADD or CREATE depending on next token
     */
    public getNextStatement(): STATEMENT | null {
        const tokenizer = ASTNode.getTokenizer();
        if (tokenizer.checkToken("CREATE")) {
            return new CREATE();
        }
        if (tokenizer.checkToken("ADD")){
            return new ADD();
        }
        if (tokenizer.checkToken("POSITION")){
            return new POSITION();
        }
        if (tokenizer.checkToken("BUILD")){
            return new BUILD();
        }
        else return null;
    }

    public parseNode(): void {
        while(ASTNode.getTokenizer().hasMore()){
            const s: STATEMENT|null = this.getNextStatement();
            if(s === null) throw new ParsingException();
            s.parseNode();
            this.statements.push(s);
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
