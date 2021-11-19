import { Module } from '@nestjs/common';
import { CmoduleModule } from 'src/cmodule/cmodule.module';

@Module({imports:[CmoduleModule]})
export class BmoduleModule {}
