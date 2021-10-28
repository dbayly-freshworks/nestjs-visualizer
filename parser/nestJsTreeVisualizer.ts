import * as ts from 'typescript';
import * as fs from 'fs';
import { ModuleDependency, ModuleInfo } from './constants';
const globalFiles= {};
function gazeIntoTheAbyss(path:string){
    if(globalFiles[path]){
        console.log('File already imported');
        return globalFiles[path];

    }
    const node:ts.SourceFile = ts.createSourceFile('app.module.ts',
    fs.readFileSync(path,'utf8'),
    ts.ScriptTarget.Latest);
    const imports = getModuleImports(node);
    const currentModule:ModuleInfo = getModules(node,imports);
    //fs.writeFileSync('./out.json',JSON.stringify(node));
    // const imports = getModuleImports(node);
    // const modules:ModuleInfo[] = getModules(node,imports); 
    // console.log(modules);
    globalFiles[path] = {
        name:currentModule.moduleName,
        path
    };
    return currentModule;
}

function getModules(node:ts.SourceFile, imports?:ModuleDependency[]):ModuleInfo{
    // Make the assumption that there will only be one ClassDeclaration
    let classDeclarations= [];
    node.forEachChild(child => {
        if (ts.SyntaxKind[child.kind] === 'ClassDeclaration') {
          classDeclarations.push(child)
        }
    });

    let moduleDecoratorDeclaration:ModuleInfo;
    classDeclarations.forEach(declaration=>{
        declaration.decorators.forEach(decorator => {
            if(decorator?.expression?.expression?.escapedText ==='Module'){
                moduleDecoratorDeclaration = {
                    moduleName:classDeclarations[0]?.name?.escapedText,
                    imports:[],
                    controllers:[],
                    exports:[],
                    providers:[]
                }
            }
        });
    })
    
    return moduleDecoratorDeclaration
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