import * as React from "react";
import ObjectNode from "./ObjectNode";

/**
 * Represents
 * an entire page
 */
export default class PAGE extends ObjectNode{

    public evaluateNode(): JSX.Element {
        return (<p>hey</p>);
    }

    public addChild(child: ObjectNode|string): void {
    }
}
