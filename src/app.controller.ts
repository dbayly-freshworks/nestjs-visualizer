import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ABCD_full } from 'parser/full';
import { Graph, ModuleInfo } from 'parser/constants';
import { TreeToDGraph } from 'parser/treeToDgraph';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('graph')
  getGraph() :{data:string} {
    const graph:Graph = TreeToDGraph(ABCD_full); 
    return {data:JSON.stringify(graph)}
  }
}
