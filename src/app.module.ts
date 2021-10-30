import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from 'src/app.service';
import { AmoduleModule } from './amodule/amodule.module';
import { BmoduleModule } from './bmodule/bmodule.module';
import { CmoduleModule } from './cmodule/cmodule.module';

@Module({
  imports: [AmoduleModule, BmoduleModule, CmoduleModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}