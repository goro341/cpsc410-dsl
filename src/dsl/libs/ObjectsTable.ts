// I think tokenizer will be all static for ease of use
import ObjectNode from "../ast/obj/ObjectNode";
import CREATE from "../ast/CREATE";

export default class ObjectsTable {
    private static data: Map<string, ObjectNode> = new Map<string, ObjectNode>();

    private static pastStates: Map<string, ObjectNode>[] = [];

    public static saveState(){
        this.pastStates.push(this.data);
        this.data = new Map<string, ObjectNode>();
    }

    public static popState(){
        if(this.pastStates.length > 0)
            this.data = this.pastStates.shift() as Map<string, ObjectNode>;
    }

    public static putObject(name: string, object: ObjectNode) {
        this.data.set(name, object);
    }

    public static hasObject(name: string): boolean {
        return this.data.has(name);
    }

    public static getObject(name: string): ObjectNode | undefined {
        return this.data.get(name);
    }

    public static getAllObjects(): IterableIterator<[string, ObjectNode]> {
        return this.data.entries();
    }
}
