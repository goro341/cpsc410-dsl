import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import PROGRAM from "./dsl/ast/PROGRAM";
import Tokenizer from "./dsl/libs/Tokenizer";
import DSLException from "./dsl/exception/DSLException";

(async () => {
    console.log("this is the main function");

    const literals = ["CREATE", "ADD", "PAGE", "COMPONENT", "PHOTO", "TABLE", "ROW",
        "to", "POSITION", "CENTER", "BUILD", "HEADER", ","];
    try {
        await Tokenizer.makeTokenizer(literals);
        const program = new PROGRAM();
        program.parseNode();
        const root: JSX.Element = program.evaluateNode();

        ReactDOM.render(root, document.getElementById('root'));
    }
    catch (e) {
        if(e instanceof DSLException){
            console.log("A DSL ERROR OCCURED, print to screen");
            console.log(e);
        }
        else {
            console.log("A BAD ERROR OCCURED");
            console.log(e);
        }
    }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
})();
