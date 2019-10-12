import ObjectNode from "./ObjectNode";
import React from "react";
import TypeMismatchError from "../../exception/TypeMismatchError";
import PAGE from "./PAGE";
import {Link} from "react-router-dom";
import ROW from "./ROW";

export default class TABLE extends ObjectNode{
    private children: ROW[];

    constructor(name: string) {
        super(name);
        this.children = [];
    }

    public evaluateNode(): JSX.Element {
        return (<table key={this.getRenderSafeName()}><tbody>{this.children.map(c => c.evaluateNode())}</tbody></table>);
    }

    public addChild(child: ObjectNode|string): void {
        if(child instanceof ROW){
            this.children.push(child);
        }
        else{
            throw new TypeMismatchError();
        }
    }
}
