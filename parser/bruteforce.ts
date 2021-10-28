import * as ts from 'typescript';

function gazeIntoTheAbyss(path:string){
    const node = ts.createSourceFile('',path,ts.ScriptTarget.Latest);
    console.log(node);
}
export default gazeIntoTheAbyss; 