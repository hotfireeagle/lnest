import { ArgumentMetadata, Injectable, PipeTransform, HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ApiErrorCode } from '../common/api-error-code';

@Injectable()
export class ApiParamsValidatePipe implements PipeTransform {

  /** 哪些metadataType需要被校验 */
  private needValidate(metatype): boolean {
    const types = [ String, Boolean, Number, Array, Object ];
    return !types.includes(metatype);
  }

  /** 构造错误提示数据 */
  private generateError(errors: any[]): string {
    const result = [];
    errors.map(errObj => {
      const errDescObj = errObj.constraints;
      Object.keys(errDescObj).map(key => { result.push(errDescObj[key]); });
    });
    return result.join('-');
  }

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.needValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const message = this.generateError(errors);
      throw new HttpException({ status: ApiErrorCode.INVALID_POST_PARAMS, message }, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
