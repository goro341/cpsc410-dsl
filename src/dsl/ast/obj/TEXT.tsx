/**
 * Represents
 */
import ObjectNode from "./ObjectNode";
import React from "react";
import TypeMismatchError from "../../exception/TypeMismatchError";
import PAGE from "./PAGE";
import {type} from "os";
import Header from "../../../components/Header";

export default class TEXT extends ObjectNode{
    private content: string;

    constructor(name: string) {
        super(name);
        this.content = "";
    }

    public evaluateNode(): JSX.Element {
        return (<p key={this.getRenderSafeName()}>{this.content}</p>);
    }

    public addChild(child: ObjectNode|string): void {
        if(typeof child !== "string"){
            throw new TypeMismatchError();
        }
        this.content += child;
    }
}
