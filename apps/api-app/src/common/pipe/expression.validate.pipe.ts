import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ExpressionValidatePipe implements PipeTransform {
  transform(value: { expression: string }, metadata: ArgumentMetadata) {
    if (value && value.expression.trim().length > 0) {
      return value;
    }
    throw new BadRequestException("Expression cann't be blank");
  }
}
