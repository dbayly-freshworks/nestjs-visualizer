export function extractPrefix(path:string):string{
    return path.split('\/').slice(0,-1).join('\/');
}