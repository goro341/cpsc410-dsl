import ObjectNode from "./ObjectNode";
import React from "react";
import PAGE from "./PAGE";
import {Link} from "react-router-dom";
import TypeMismatchError from "../../exception/TypeMismatchError";

export default class ROW extends ObjectNode{
    private children: (ObjectNode|string)[];

    constructor(name: string) {
        super(name);
        this.children = [];
    }

    public evaluateNode(): JSX.Element {
        return (<tr key={this.getRenderSafeName()}>
            {this.children.map((c, idx) => <td key={this.getRenderSafeName() + idx.toString()}>{typeof c === "string" ? c : c.evaluateNode()}</td>)}
        </tr>);
    }

    public addChild(child: ObjectNode|string): void {
        if(child instanceof PAGE){
            throw new TypeMismatchError();
        }
        this.children.push(child);
    }
}
