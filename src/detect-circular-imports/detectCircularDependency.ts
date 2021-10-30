import * as path from 'path';
import * as fs from 'fs';

export default function detectCircularImports() {
  const rawData = fs.readFileSync(
    path.resolve(__dirname, 'samplemodel.json'),
    'utf-8',
  );

  // need create a hashmap to save the parse result
  // key is module name, value is the imports module, should be an array
  // when we parse a new key , we check the imports module name is existing or not
  // if it exist, means this is a circular dependency
  const map = new Map<string, string[]>();
  const mapKey = 'appModule';
  map.set(mapKey, []);
  for (const [key, value] of Object.entries(JSON.parse(rawData))) {
    if (key === 'imports' && value instanceof Array) {
      for (let i = 0; i < value.length; i++) {
        retrieveImportsFromChildren(value[i], map, mapKey);
      }
    }
  }

  console.log('this is res,', map);
}
function retrieveImportsFromChildren(
  input: any,
  map: Map<string, string[]>,
  mapKey: string,
) {
  const v = map.get(mapKey);

  if (v !== undefined) {
    let duplicate = false;
    for (let i = 0; i < v.length; i++) {
      if (v[i] === input.module.moduleName) duplicate = true;
    }
    console.log('get map key and  value', mapKey, v);
    if (!duplicate) v.push(input.module.moduleName);
  } else map.set(mapKey, [input.module.moduleName]);

  if (input.module.imports.length !== 0) {
    for (let i = 0; i < input.module.imports.length; i++) {
      retrieveImportsFromChildren(
        input.module.imports[i],
        map,
        input.module.moduleName,
      );
    }
  } else if (input.module.imports.length === 0) {
    map.set(input.name, []);
  }
}
