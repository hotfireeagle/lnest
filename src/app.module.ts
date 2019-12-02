import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGODB } from './app.config';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(MONGODB.url),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
