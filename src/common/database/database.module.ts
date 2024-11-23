import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DbMigrationService } from './db-migrations.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
    useFactory: (configService: ConfigService) =>({
        uri: configService.get('MONGODB_URI'),
    }),
    inject: [ConfigService]
    })
  ],
  providers: [DbMigrationService],
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]){
    return MongooseModule.forFeature(models);
  }
}
