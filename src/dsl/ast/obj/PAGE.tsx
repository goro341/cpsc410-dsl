/**
 * Represents
 * an entire page
 */
import ObjectNode from "./ObjectNode";
import React from "react";
import TypeMismatchError from "../../exception/TypeMismatchError";

export default class PAGE extends ObjectNode{
    private children: ObjectNode[];

    constructor(name: string) {
        super(name);
        this.children = [];
    }

    public evaluateNode(): JSX.Element {
        return (<div key={this.name}>{this.children.map(c => c.evaluateNode())}</div>);
    }

    public addChild(child: ObjectNode|string): void {
        if(child instanceof PAGE || typeof child === "string"){
            throw new TypeMismatchError();
        }
        this.children.push(child);
    }
}
