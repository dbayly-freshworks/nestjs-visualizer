import * as ts from 'typescript';
import * as fs from 'fs';
import { ModuleDependency, ModuleInfo } from './constants';
const globalFiles= {};
function getModuleTree(path:string,prefix:string, depth:number):ModuleInfo{
    if(depth > 10){
        return; 
    }
    if(globalFiles[path]){
        return globalFiles[path];
    }
    const node:ts.SourceFile = ts.createSourceFile('app.module.ts',
    fs.readFileSync(path,'utf8'),
    ts.ScriptTarget.Latest);
    const imports = getModuleImports(node);
    const currentModule:ModuleInfo = getModules(node,imports,prefix,depth);
    return currentModule;
}

function getModules(node:ts.SourceFile, imports:ModuleDependency[],prefix:string,depth:number):ModuleInfo{
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
                // Module decorator only has one argument
                decorator?.expression?.arguments[0]?.properties.forEach(property => {
                    switch(property?.name?.escapedText){
                        case 'imports':
                            property?.initializer?.elements?.forEach(element => {
                                
                                const foundImport:ModuleDependency = imports.find((moduleImport)=>moduleImport?.name === element?.escapedText)
                                
                                if(foundImport?.path){
                                    let fixedPath = '';
                                    if(foundImport.path[0]==='.'){
                                        fixedPath = prefix+'/'+foundImport?.path.slice(2)+".ts"
                                    }else{
                                        fixedPath = prefix+foundImport?.path.slice(3)+".ts"
                                    }
                                    const newModuleWhoDis = getModuleTree(fixedPath,prefix,depth+1);
                                    moduleDecoratorDeclaration.imports.push(
                                        {
                                            ...foundImport,
                                            module:newModuleWhoDis
                                        }
                                    )
                                }else{
                                    console.log('Element not found!',element);
                                }
                            });
                            break;
                        case 'controllers':
                            property?.initializer?.elements?.forEach(element => {
                                moduleDecoratorDeclaration?.controllers.push(
                                    imports.find((moduleImport)=>moduleImport?.name === element?.escapedText)
                                )

                            });
                            break;
                        case 'providers':
                            property?.initializer?.elements?.forEach(element => {
                                moduleDecoratorDeclaration.providers.push(
                                    imports.find((moduleImport)=>moduleImport?.name === element?.escapedText)
                                )
                            });
                            break;
                        case 'exports':
                            property?.initializer?.elements?.forEach(element => {
                                moduleDecoratorDeclaration.exports.push(
                                    imports.find((moduleImport)=>moduleImport?.name === element?.escapedText)
                                )
                            });
                            break;
                    }
                });
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



export default getModuleTree; 