import ObjectNode from "./ObjectNode";
import React from "react";
import TypeMismatchError from "../../exception/TypeMismatchError";
import PAGE from "./PAGE";
import {Link} from "react-router-dom";
import ROW from "./ROW";
import {Paper, Table, TableBody} from "@material-ui/core";

export default abstract class GRIDIT extends ObjectNode{
    private children: (ObjectNode|string)[];

    constructor(name: string) {
        super(name);
        this.children = [];
    }

    public evaluateNode(): JSX.Element {
        return <div>{this.children.map((c, idx) => (typeof c === "string" ? <p key={this.getRenderSafeName() + "pOFFEST" + idx}>{c}</p> : c.evaluateNode()))}</div>;
    }

    public addChild(child: ObjectNode|string): void {
        if(child instanceof PAGE){
            throw new TypeMismatchError();
        }
        else{
            this.children.push(child);
        }
    }
}
