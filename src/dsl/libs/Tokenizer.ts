// I think tokenizer will be all static for ease of use

import user_input from '../user-input.txt';
import {replaceAll} from "./Utils";

export default class Tokenizer {

    private static program: string;
    private tokens: string[] = [];

    private currentToken: number;
    private static theTokenizer: Tokenizer;


    private constructor(program: string, private literals: string[]) {
        this.currentToken = 0;
        try {
            Tokenizer.program = program;
        } catch (e) {
            console.log("didn't find file");
            // EXIT
        }
        this.tokenize();
    }

    private tokenize() {
        let tokenizedProgram = Tokenizer.program
            .replace(/\n/g, "");

        for (let s of this.literals) {
            tokenizedProgram = replaceAll(tokenizedProgram, s, "_" + s + "_");
            console.log(tokenizedProgram);
        }
        tokenizedProgram = tokenizedProgram.replace(/[ ]+/g, "");
        tokenizedProgram = replaceAll(tokenizedProgram, "__","_");
        console.log(tokenizedProgram);
        const tempArray = tokenizedProgram.split("_");
        this.tokens = tempArray.slice(1);
        console.log(this.tokens);
    }

    public getNext(): string {
        let token = "";
        if (this.currentToken < this.tokens.length) {
            token = this.tokens[this.currentToken];
            this.currentToken++;
        } else
            token = "NULLTOKEN";
        return token;
    }

    private checkNext(): string {
        let token = "";
        if (this.currentToken < this.tokens.length) {
            token = this.tokens[this.currentToken];
        } else
            token = "NO_MORE_TOKENS";
        return token;
    }

    public checkToken(stringRegex: string): boolean {
        const regex = RegExp(stringRegex);
        const s = this.checkNext();
        console.log("comparing: |" + s + "|  to  |" + regex + "|");
        return regex.test(s);
    }

    public getAndCheckNext(stringRegex: string): string {
        const regex = RegExp(stringRegex);
        const s = this.getNext();
        if (!regex.test(s)) {
            console.log("FAILED!!! on " + stringRegex);
            // EXIT
        }
        console.log("matched: " + s + "  to  " + stringRegex);
        return s;
    }

    public hasMore(): boolean {
        return this.currentToken < this.tokens.length;
    }

    public static async makeTokenizer(literals: string[]) {
        const program = await (await fetch(user_input)).text();
        if (!this.theTokenizer) {
            this.theTokenizer = new Tokenizer(program, literals);
        }
    }

    public static getTokenizer(): Tokenizer {
        return this.theTokenizer;
    }
}