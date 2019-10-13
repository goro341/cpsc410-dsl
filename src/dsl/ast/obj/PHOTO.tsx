/**
 * Represents
 */
import ObjectNode from "./ObjectNode";
import React from "react";
import TypeMismatchError from "../../exception/TypeMismatchError";
import PAGE from "./PAGE";
import {type} from "os";
import Header from "../../../components/Header";
import {Paper} from "@material-ui/core";

export default class PHOTO extends ObjectNode{
    private url: string;

    constructor(name: string) {
        super(name);
        this.url = "";
    }

    public evaluateNode(): JSX.Element {
        return (<img src={this.url} alt={this.getName()} key={this.getRenderSafeName()}/>);
    }

    public addChild(child: ObjectNode|string): void {
        if(typeof child !== "string"){
            throw new TypeMismatchError();
        }
        this.url = child;
    }
}
