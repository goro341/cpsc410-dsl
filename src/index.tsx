import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import PROGRAM from "./dsl/ast/PROGRAM";
import Tokenizer from "./dsl/libs/Tokenizer";

console.log("this is the main function");

const literals = ["CREATE", "ADD", "PAGE", "COMPONENT", "PHOTO", "TABLE", "ROW", "to"];
const userInputFilePath = "src/dsl/user-input.txt";
Tokenizer.makeTokenizer(userInputFilePath, literals);
const program = new PROGRAM();
program.parseNode();
const root: JSX.Element = program.evaluateNode();

ReactDOM.render(root, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
