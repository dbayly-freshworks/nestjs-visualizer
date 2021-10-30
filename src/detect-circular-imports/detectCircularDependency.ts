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
  return map;
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

export function checkCircularDependency(map: Map<string, string[]>) {
  const circularDependencyMap = new Map<string, string>();
  // check to see if this module already exist, if exist then check it's dependency
  map.forEach((value: string[], key: string) => {
    console.log(key, value);
    for (let i = 0; i < value.length; i++) {
      const anotherModuleDependency = map.get(value[i]);
      for (let j = 0; j < anotherModuleDependency.length; j++) {
        if (anotherModuleDependency[j] === key) {
          circularDependencyMap.set(key, anotherModuleDependency[j]);
          break;
        }
      }
    }
  });
  return circularDependencyMap;
}
