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
import ADD_LIT from "./ADD_LIT";
import TypeMismatchError from "../exception/TypeMismatchError";
import TEXT from "./obj/TEXT";
import HTML from "./obj/HTML";
import MD from "./obj/MD";
import LoadContentNotRecognizedError from "../exception/LoadContentNotRecognizedError";
import Tokenizer from "../libs/Tokenizer";
import PROGRAM from "./PROGRAM";

/**
 * Represents
 * LOAD (...) t
 *
 */
export default class LOAD extends ASTNode{
    private name: string;
    private thingToLoad: ADD_LIT;


    constructor() {
        super();
        this.name = "";
        this.thingToLoad = new ADD_LIT();
    }

    public parseNode(): void {
        const tokenizer = ASTNode.getTokenizer();
        tokenizer.getAndCheckNext('LOAD');
        this.thingToLoad.parseNode();
        tokenizer.getAndCheckNext('with');
        this.name = tokenizer.getNext();
    }

    public async evaluateNode(): Promise<void> {
        let item = await this.thingToLoad.evaluateNode();
        console.log(item);
        if(item instanceof ObjectNode) throw new TypeMismatchError();
        let content = await (await fetch(item)).text();
        if(item.endsWith("txt")){
            let t = new TEXT(this.name);
            t.addChild(content);
            ObjectsTable.putObject(this.name, t);
        }
        else if(item.endsWith("html")){
            let html = new HTML(this.name);
            html.addChild(content);
            ObjectsTable.putObject(this.name, html);
        }
        else if(item.endsWith("md")){
            let md = new MD(this.name);
            md.addChild(content);
            ObjectsTable.putObject(this.name, md);
        }
        else if(item.endsWith("web")){
            Tokenizer.saveState();
            ObjectsTable.saveState();
            const literals = ["CREATE", "ADD", "PAGE", "COMPONENT", "PHOTO", "TABLE", "ROW",
                "to", "POSITION", "CENTER", "BUILD", "HEADER", ",", "TEXT", "LINK", "GRID", "SM BLOCK", "MD BLOCK ", "LG BLOCK", "LOAD", "with"];
            await Tokenizer.makeTokenizer(literals, item);
            const program = new PROGRAM();
            program.parseNode();
            await program.evaluateNode();
            if(!ObjectsTable.hasObject(this.name)) throw new ObjectTypeNotExistsError();
            const obj: ObjectNode = ObjectsTable.getObject(this.name) as ObjectNode;
            // @ts-ignore
            obj['___loaded'] = true;

            ObjectsTable.popState();
            Tokenizer.popState();
            ObjectsTable.putObject(this.name, obj);
        } else {
            throw new LoadContentNotRecognizedError();
        }
    }
}
