// @ts-ignore
import reactElementToJSXString from 'react-element-to-jsx-string';

export default function buildOutputFile(element: JSX.Element): string {
    const page = reactElementToJSXString(element);
    /*
        TODO surround page with what is in App.tsx
        I think eventually we will want to create a set of components that can be used in the JSX output
        Then we can create a central file that combines all of these into a single export
        Which we can put at the top of all ASTNode's and at the top of the generated App.tsx
     */
    return page;

}
