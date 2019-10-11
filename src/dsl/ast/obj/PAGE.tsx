/**
 * Represents
 * an entire page
 */
import ObjectNode from "./ObjectNode";
import React from "react";
import TypeMismatchError from "../../exception/TypeMismatchError";
import {
    Route
} from "react-router-dom";

export default class PAGE extends ObjectNode{
    private children: ObjectNode[];

    constructor(name: string) {
        super(name);
        this.children = [];
    }

    public evaluateNode(): JSX.Element {
        return (<Route exact key={this.name} path={"/" + this.name}>{this.children.map(c => c.evaluateNode())}</Route>);
    }

    public addChild(child: ObjectNode|string): void {
        if(child instanceof PAGE || typeof child === "string"){
            throw new TypeMismatchError();
        }
        this.children.push(child);
    }
}
