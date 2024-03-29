// I think tokenizer will be all static for ease of use

import {replaceAll} from "./Utils";
import ObjectNode from "../ast/obj/ObjectNode";

export default class Tokenizer {
    private static program: string;
    private tokens: string[] = [];

    private currentToken: number;
    private static theTokenizer: Tokenizer|undefined;

    private static pastStates: Tokenizer[] = [];


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
        }
        tokenizedProgram = tokenizedProgram.replace(/([^"]+)|("[^"]+")/g, function($0, $1, $2) {
            if ($1) {
                return $1.replace(/\s/g, '');
            } else {
                return $2;
            }
        });
        tokenizedProgram = replaceAll(tokenizedProgram, "__","_");
        const tempArray = tokenizedProgram.split("_");
        this.tokens = tempArray.slice(1, -1);
        // console.log(this.tokens);
    }

    public static saveState(){
        if(this.theTokenizer) {
            this.pastStates.push(this.theTokenizer);
            this.theTokenizer = undefined;
        }
    }

    public static popState(){
        if(this.pastStates.length > 0)
            this.theTokenizer = this.pastStates.shift();
    }

    public getNext(): string {
        let token = "";
        if (this.currentToken < this.tokens.length) {
            token = this.tokens[this.currentToken];
            this.currentToken++;
        } else
            token = "NULLTOKEN";
        // console.log('get ', token);
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
        // console.log("comparing: |" + s + "|  to  |" + regex + "|");
        return regex.test(s);
    }

    public getAndCheckNext(stringRegex: string): string {
        const regex = RegExp(stringRegex, 'g');
        const s = this.getNext();
        if (!regex.test(s)) {
            // console.log("FAILED!!! on " + stringRegex);
            // EXIT
        }
        // console.log("matched: " + s + "  to  " + stringRegex);
        return s;
    }

    public hasMore(): boolean {
        return this.currentToken < this.tokens.length;
    }

    public static async makeTokenizer(literals: string[], file: string) {
        const program = await (await fetch(file)).text();
        if (!this.theTokenizer) {
            this.theTokenizer = new Tokenizer(program, literals);
        }
    }

    public reset(){
        this.currentToken = 0;
        this.tokenize();
    }

    public static getTokenizer(): Tokenizer {
        return this.theTokenizer as Tokenizer;
    }
}
