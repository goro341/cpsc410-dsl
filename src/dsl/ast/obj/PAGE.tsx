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
import {Container} from "@material-ui/core";
import HEADER from "./HEADER";
import FLUIDELEMENT from "./FLUIDELEMENT";

export default class PAGE extends ObjectNode{
    private children: ObjectNode[];

    constructor(name: string) {
        super(name);
        this.children = [];
    }

    public evaluateNode(): JSX.Element {
        return (<Route exact key={this.getRenderSafeName()} path={"/" + this.name}>
            {this.children.filter(c => c instanceof FLUIDELEMENT).map(c => c.evaluateNode())}
            <Container maxWidth="md">
                {this.children.filter(c => !(c instanceof FLUIDELEMENT)).map(c => c.evaluateNode())}
            </Container>
        </Route>);
    }

    public addChild(child: ObjectNode|string): void {
        if(child instanceof PAGE || typeof child === "string"){
            throw new TypeMismatchError();
        }
        this.children.push(child);
    }
}
