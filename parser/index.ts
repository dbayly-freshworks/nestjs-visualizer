import gazeIntoTheAbyss from './bruteforce';
import * as minimist from 'minimist';
import { ParserArgs } from './constants';
function main(){
    let args:ParserArgs = minimist(process.argv.slice(2))
    console.log(args.path);
    gazeIntoTheAbyss(args.path);
}
main();