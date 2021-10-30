import detectCircularImports, {
  checkCircularDependency,
} from './detectCircularDependency';
export function main() {
  const map = detectCircularImports();
  //call detectcircular class to parse the input(json file from parser part)
  const result = checkCircularDependency(map);
  console.log('final res', result);
}

main();
