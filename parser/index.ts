import getModuleTree from './nestJsTreeVisualizer';
import * as minimist from 'minimist';
import { ModuleInfo, ParserArgs } from './constants';
import * as fs from 'fs';
import { extractPrefix } from './helpers';
import { asciiPrintout } from './cliGraphics';
import {ABCD_full} from './full';
import { TreeToDGraph } from './treeToDgraph';


function main(){
    const args:ParserArgs = minimist(process.argv.slice(2))
    const prefix = extractPrefix(args.path);
    const moduleTree:ModuleInfo = getModuleTree(args.path,prefix,0);
    asciiPrintout(ABCD_full,0,true);
    TreeToDGraph(ABCD_full)
    //fs.writeFileSync('out.json',JSON.stringify(moduleTree));
}

main();