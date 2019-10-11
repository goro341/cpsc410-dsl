import Parser from "./libs/Parser";
import Executor from "./libs/Executor";
import ASTNode from "./ast/ASTNode";
import OutputBuilder from "./libs/OutputBuilder";
import Tokenizer from "./libs/Tokenizer";

console.log("this is the main function");

Tokenizer.tokenize("heyllo");

const root: ASTNode = Parser.parse();
const code: JSX.Element = Executor.execute(root);

OutputBuilder.build(code);
