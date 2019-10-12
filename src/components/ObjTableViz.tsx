import React from "react";
// @ts-ignore
import Graph from "react-graph-vis";
import ObjectsTable from "../dsl/libs/ObjectsTable";
import PAGE from "../dsl/ast/obj/PAGE";
import ObjectNode from "../dsl/ast/obj/ObjectNode";

export default function ObjTableViz() {
    let nodes = [];
    let edges = [];

    let it = ObjectsTable.getAllObjects();
    let result = it.next();
    let arr = [];
    while (!result.done) {
        if(result.value[1] instanceof ObjectNode){
            nodes.push({
                id: result.value[1].getName(),
                label: result.value[1].constructor.name + "\n" + result.value[1].getName()
            });
            // @ts-ignore
            if(result.value[1]['children'] !== undefined) {
                // @ts-ignore
                let children: (ObjectNode | string)[] = result.value[1]['children'];
                for (let child of children) {
                    if(child instanceof ObjectNode){
                        edges.push({
                            to: child.getName(),
                            from: result.value[1].getName()
                        });
                    }
                }
            }

        }
        result = it.next();
    }
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
