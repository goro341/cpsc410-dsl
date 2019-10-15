# cpsc410-dsl

Project can be run with `npm install` and then `npm run react_start`. This will open a browser at `localhost:3000`.

## Commands
* `ADD ... to s` - makes the components or text in "..." children of s
* `CREATE TYPE name` - creates a component called "name" with type of "TYPE"
* `LOAD "/file.txt" with name` - loads a file called "file.txt" into name
    * file has different loaders for "html", "md", "txt", and "web"

## Debug viz
There are two debug viz thing available for examining the code. They work on desktops and not mobile
* `/debug/ast` -- will render the AST
* `/debug/obj` -- will render the relationships in the objects table into a graph

## Problems
We don't do cycle finding yet, so in theory you could create cycles with "ADD" statements. You could also create cycles with "LOAD" statements. 
