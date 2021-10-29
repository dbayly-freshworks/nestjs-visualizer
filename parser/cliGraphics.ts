import { ModuleInfo,colors, ModuleDependency } from './constants';
// Hot colors (red/yellow) are hard on the eyes
const coolRainbow = [
    colors.FgMagenta,
    colors.FgBlue,
    colors.FgCyan,
    colors.FgGreen,
]
const tab = "   ";
export function asciiPrintout(module:ModuleInfo, depth:number, verbose?:boolean){
    printColoredLine(module.moduleName,depth);
    if(verbose){
        printColoredArray('Controllers',module.controllers,depth+1);
        printColoredArray('Providers',module.providers,depth+1);
        printColoredArray('Exports',module.exports,depth+1);

    }
    if(module.imports.length){
        printColoredLine('Imports',depth+1);
        module.imports.forEach((module)=>{
            if(module.module){
                asciiPrintout(module.module,depth+2);
            }else{
                printColoredLine(module.name,depth+2);
            }
        })
    }
    return;
}

function printColoredLine(text:string,depth:number){
    console.log(coolRainbow[depth%coolRainbow.length], tab.repeat(depth)+text)
}
function printColoredArray(name:string,array:ModuleDependency[],depth:number){
    printColoredLine(name,depth);
    array.forEach((item)=>{
        printColoredLine(item.name,depth+1);
    })
}