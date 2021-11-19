import { Edge, Graph, GraphNode, ModuleInfo,ArrowType, ModuleDependency } from "./constants";

export function TreeToDGraph(root:ModuleInfo):Graph{
    const nodes:GraphNode[] = [];
    const edges:Edge[] = [];
    let index = 0;
    function handleNode(branch:ModuleInfo){
        let currentModule:GraphNode=getOrCreateGraphNode(branch.moduleName);
        iterateArray(branch.imports,currentModule);
        // iterateArray(branch.controllers,currentModule);
        // iterateArray(branch.exports,currentModule);
        // iterateArray(branch.providers,currentModule);


    }
    function iterateArray(arr:ModuleDependency[],currentModule:GraphNode){
        arr.forEach(element =>{
            let importedModule = getOrCreateGraphNode(element.name);
            edges.push({
                from:importedModule.id,
                to:currentModule.id,
                arrows:{
                    to:{
                        enabled:true,
                        type:ArrowType.Arrow
                    }
                }
            })
            if(element.module){
                handleNode(element.module);
            }
        })
    }
    function getOrCreateGraphNode(nodeName:string):GraphNode{
        let currentModule = nodes.find(graphNode=>graphNode.label===nodeName)
        if(!currentModule){
            currentModule={id:index,label:nodeName};
            nodes.push(currentModule)
            index++
        }
        return currentModule;
    }
    handleNode(root);
    const result:Graph = {
        nodes,
        edges
    }
    return result;
}
