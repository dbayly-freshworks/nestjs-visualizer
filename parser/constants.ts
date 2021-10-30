export interface ParserArgs{
    _:string[],
    path:string
}

export interface ModuleInfo{
    moduleName:string;
    imports:ModuleDependency[]
    exports:ModuleDependency[]
    controllers:ModuleDependency[]
    providers:ModuleDependency[]
}

export interface ModuleDependency{
    name: string
    path: string 
    module?:ModuleInfo
}

export interface GraphNode {
    id:number
    label:string
}

export interface Edge {
    from:number,
    to:number
    arrows?:{
        enabled:boolean 
        type:string
    }
}

export interface Graph {
    nodes:GraphNode[],
    edges:Edge[]
}

export enum ArrowType{
    Arrow="arrow",
    Bar="bar",
    Circle="circle",
    Box="box",
    Crow="crow",
    Curve="curve",
    InvCurve="inv_curve",
    Diamond="diamond",
    Triangle="triangle",
    InvTriangle="inv_triangle",
    Vee="vee"
}

export const colors ={
    Reset : "\x1b[0m%s\x1b[0m",
    Bright : "\x1b[1m%s\x1b[0m",
    Dim : "\x1b[2m%s\x1b[0m",
    Underscore : "\x1b[4m%s\x1b[0m",
    Blink : "\x1b[5m%s\x1b[0m",
    Reverse : "\x1b[7m%s\x1b[0m",
    Hidden :  "\x1b[8m%s\x1b[0m",
    FgBlack : "\x1b[30m%s\x1b[0m",
    FgRed : "\x1b[31m%s\x1b[0m",
    FgGreen : "\x1b[32m%s\x1b[0m",
    FgYellow : "\x1b[33m%s\x1b[0m",
    FgBlue : "\x1b[34m%s\x1b[0m",
    FgMagenta : "\x1b[35m%s\x1b[0m",
    FgCyan : "\x1b[36m%s\x1b[0m",
    FgWhite : "\x1b[37m%s\x1b[0m",
    BgBlack : "\x1b[40m%s\x1b[0m",
    BgRed : "\x1b[41m%s\x1b[0m",
    BgGreen : "\x1b[42m%s\x1b[0m",
    BgYellow : "\x1b[43m%s\x1b[0m",
    BgBlue : "\x1b[44m%s\x1b[0m",
    BgMagenta : "\x1b[45m%s\x1b[0m",
    BgCyan : "\x1b[46m%s\x1b[0m",
    BgWhite : "\x1b[47m%s\x1b[0m",
}