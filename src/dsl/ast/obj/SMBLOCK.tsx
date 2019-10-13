import ObjectNode from "./ObjectNode";
import React from "react";
import TypeMismatchError from "../../exception/TypeMismatchError";
import PAGE from "./PAGE";
import {Link} from "react-router-dom";
import ROW from "./ROW";
import {Grid, Paper, Table, TableBody} from "@material-ui/core";
import GRIDIT from "./GRIDIT";

export default class SMBLOCK extends GRIDIT{

    constructor(name: string) {
        super(name);
    }

    public evaluateNode(): JSX.Element {
        return (<Grid item sm={4} key={this.getRenderSafeName()}>{super.evaluateNode()}</Grid>);
    }
}
