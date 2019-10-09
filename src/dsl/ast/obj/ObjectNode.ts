import ASTNode from "../ASTNode";
import React from "react";

export default abstract class ObjectNode extends ASTNode{
    // object nodes never need parsing
    // because the parsing is done in CREATE or ADD (or SET)
    public parseNode(): void {
    }
    /**
     * Attempts to add a new child
     * Should throw some runtime exception if it fails
     * @param child
     */
    public abstract addChild(child: ObjectNode|string): void;
}
