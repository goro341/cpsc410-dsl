/**
 * Represents
 */
import ObjectNode from "./ObjectNode";
import React from "react";
import TypeMismatchError from "../../exception/TypeMismatchError";
import PAGE from "./PAGE";
import {type} from "os";
import Header from "../../../components/Header";
import {Link} from "react-router-dom";
import TEXT from "./TEXT";

export default class LINK extends ObjectNode{
    private children: (ObjectNode|string)[];
    private target: string;

    constructor(name: string) {
        super(name);
        this.children = [];
        this.target = "";
    }

    public evaluateNode(): JSX.Element {
        return (<Link to={"/" + this.target} key={this.getRenderSafeName()} >{this.children.map(c => typeof c === "string" ? c : c.evaluateNode())}</Link>);
    }

    public addChild(child: ObjectNode|string): void {
        if(child instanceof PAGE){
            this.target = child.getName();
            return;
        }
        if(typeof child === "string"){
            this.children.push(child);
        } else {
            this.children.push(child);
        }
    }
}
