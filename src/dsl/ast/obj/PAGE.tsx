import * as React from "react";
import STATEMENT from "../STATEMENT";
import ObjectNode from "./ObjectNode";

/**
 * Represents
 * an entire page
 */
export default class PAGE extends ObjectNode{

    public evaluateNode(): JSX.Element|void {
        return (<p>hey</p>);
    }

    public addChild(child: ObjectNode|string): void {
    }
}
