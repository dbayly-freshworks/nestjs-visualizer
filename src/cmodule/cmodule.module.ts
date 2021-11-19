import { Module } from '@nestjs/common';
import { AmoduleModule } from 'src/amodule/amodule.module';

@Module({imports:[AmoduleModule]})
export class CmoduleModule {}
