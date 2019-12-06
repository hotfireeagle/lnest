import { Module } from '@nestjs/common';
import { APP_PIPE, APP_GUARD } from '@nestjs/core';
import { UserModule } from './module/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGODB } from './common/app.config';
import { ApiParamsValidatePipe } from './pipes/api-params-validate.pipe';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(MONGODB.url),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ApiParamsValidatePipe,
    },                                                                  // 在全局作用域范围内都使用这个对参数进行校验的pipe
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },                                                                  // jwt守卫
  ],
})
export class AppModule {}
