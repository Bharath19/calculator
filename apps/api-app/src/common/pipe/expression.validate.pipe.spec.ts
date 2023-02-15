import { ArgumentMetadata, BadRequestException } from '@nestjs/common';

import { ExpressionValidatePipe } from './expression.validate.pipe';

describe('CalculatorController', () => {
  let target: ExpressionValidatePipe;
  const metadata: ArgumentMetadata = {
    type: 'body',
    metatype: undefined,
    data: '',
  };

  beforeEach(() => {
    target = new ExpressionValidatePipe();
  });

  describe('ExpressionValidatePipe', () => {
    it('should throw bad request if empty expression', () => {
      expect(() => target.transform({ expression: '' }, metadata)).toThrow(
        new BadRequestException("Expression cann't be blank")
      );
    });

    it('should throw bad request if white space expression', () => {
      expect(() => target.transform({ expression: '   ' }, metadata)).toThrow(
        new BadRequestException("Expression cann't be blank")
      );
    });

    it('should return expression', () => {
      expect(() =>
        target.transform({ expression: '1+2+3' }, metadata)
      ).toBeTruthy();
    });
  });
});
