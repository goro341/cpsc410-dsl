import ObjectNode from "./ObjectNode";
import React from "react";
import TypeMismatchError from "../../exception/TypeMismatchError";
import PAGE from "./PAGE";
import {Link} from "react-router-dom";
import ROW from "./ROW";
import {Grid, Paper, Table, TableBody} from "@material-ui/core";
import GRIDIT from "./GRIDIT";

export default class GRID extends ObjectNode{
    private children: GRIDIT[];

    constructor(name: string) {
        super(name);
        this.children = [];
    }

    public evaluateNode(): JSX.Element {
        return (<Grid container key={this.getRenderSafeName()}>{this.children.map(c => c.evaluateNode())}</Grid>)
    }

    public addChild(child: ObjectNode|string): void {
        if(child instanceof GRIDIT){
            this.children.push(child);
        }
        else{
            throw new TypeMismatchError();
        }
    }
}
