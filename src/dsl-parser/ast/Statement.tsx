import ASTNode from "./ASTNode";
import Page from "../../containers/Page";
import React from "react";

export default abstract class Statement extends ASTNode{

    public parseNode(): void {

    }

    public evaluateNode(): JSX.Element {
        return (
            <div className="App">
                <h1>Hello world!</h1>
            </div>
        );
    }
}
