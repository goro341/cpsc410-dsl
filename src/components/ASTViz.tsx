import React from "react";
// @ts-ignore
import Graph from "react-graph-vis";
import ObjectsTable from "../dsl/libs/ObjectsTable";
import PAGE from "../dsl/ast/obj/PAGE";
import ObjectNode from "../dsl/ast/obj/ObjectNode";
import Tokenizer from "../dsl/libs/Tokenizer";
import PROGRAM from "../dsl/ast/PROGRAM";
import ASTNode from "../dsl/ast/ASTNode";
import CREATE from "../dsl/ast/CREATE";
import ADD from "../dsl/ast/ADD";
import ADD_LIT from "../dsl/ast/ADD_LIT";

export default function ASTViz() {
    Tokenizer.getTokenizer().reset();
    const program = new PROGRAM();
    program.parseNode();
    let nodes: any[] = [];
    let edges: any[] = [];

    let addNode = (node: ASTNode) => {
        console.log("adding node");
        nodes.push({
            id: node.getId(),
            // @ts-ignore
            label: node.constructor.name
        });
        if(node instanceof CREATE){
            nodes.push({
                id: node.getId() + "op1",
                // @ts-ignore
                label: "[type]\n" + node['type']
            });
            edges.push({
                to: node.getId() + "op1",
                from: node.getId()
            });

            nodes.push({
                id: node.getId() + "op2",
                // @ts-ignore
                label: "[name]\n" + node['name']
            });
            edges.push({
                to: node.getId() + "op2",
                from: node.getId()
            });
        }

        if(node instanceof ADD){
            nodes.push({
                id: node.getId() + "op1",
                // @ts-ignore
                label: "[parent]\n" + node['parent']
            });
            edges.push({
                to: node.getId() + "op1",
                from: node.getId()
            });
        }

        if(node instanceof ADD_LIT){
            nodes.push({
                id: node.getId() + "op1",
                // @ts-ignore
                label: node['item']
            });
            edges.push({
                to: node.getId() + "op1",
                from: node.getId()
            });
        }
        // @ts-ignore
        // @ts-ignore
        let children: (ObjectNode | string)[];

        // @ts-ignore
        if(node['children'] !== undefined) {
            // @ts-ignore
            children = node['children'];
        }
        // @ts-ignore
        else if(node['statements'] !== undefined){
            // @ts-ignore
            children = node['statements'];
        }
        else{
            return;
        }

        for (let child of children) {
            if(child instanceof ASTNode){
                addNode(child);
                edges.push({
                    to: child.getId(),
                    from: node.getId()
                });
            }
        }
    };

    addNode(program);

    const graph = {
        nodes: nodes,
        edges: edges
    };

    const options = {
        layout: {
            hierarchical: true
        },
        edges: {
            color: "#000000"
        },
        height: "700px"
    };

    return (
        <Graph
            graph={graph}
            options={options}
        />
    );
}
