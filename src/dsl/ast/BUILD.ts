import STATEMENT from "./STATEMENT";

export default class BUILD extends STATEMENT{

    constructor() {
        super();
    }
    public parseNode(): void {
        BUILD.getTokenizer().getAndCheckNext('BUILD');
    }

    public evaluateNode(): Promise<void> {
        return Promise.resolve();
    }
}
