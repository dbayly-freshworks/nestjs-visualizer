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