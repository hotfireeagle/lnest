import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtKey } from '../../common/app.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),                 // token信息在请求头中的token字段里面
      ignoreExpiration: false,                                        // token过期当做未授权处理
      secretOrKey: jwtKey,
    });
  }

  async validate(payload: any) {
    return { userId: payload._id, username: payload.username };
  }
}
