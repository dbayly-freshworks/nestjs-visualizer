import * as ts from 'typescript';
import * as fs from 'fs';
import { ModuleDependency } from './constants';
const globalModuleArray:ModuleDependency []= [];
function gazeIntoTheAbyss(path:string){
    const node:ts.SourceFile = ts.createSourceFile('app.module.ts',
    fs.readFileSync(path,'utf8'),
    ts.ScriptTarget.Latest);
    getModuleImports(node);
}

function findModuleInfo(node:ts.SourceFile){
    // Decorators are part of class delarations 
    let classDeclarations = [];
    node.forEachChild(child => {
        if (ts.SyntaxKind[child.kind] === 'ClassDeclaration') {
          classDeclarations.push(child);
        }
    });
    // classDeclarations.forEach(declaration =>{
    //     declaration..forEach(())
    // });
    //let moduleDependencies:ModuleDependency[];
    // fs.writeFileSync('out.json',JSON.stringify(classDeclarations));
}
function getModuleImports(node){
// Get import info.
    let importDeleclarations:ModuleDependency[] = []
    node.forEachChild(child => {
        if(ts.SyntaxKind[child.kind]==='ImportDeclaration'){
            importDeleclarations.push({
                name:child?.importClause?.namedBindings?.elements[0]?.name?.escapedText,
                path:child?.moduleSpecifier?.text as string
            });
        }
    });
    return importDeleclarations;
}



export default gazeIntoTheAbyss; 