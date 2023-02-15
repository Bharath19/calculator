import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ExpressionValidatePipe } from '../common/pipe/expression.validate.pipe';

import { CalculatorService } from './calculator.service';

@Controller('/calculate')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post()
  @UsePipes(new ExpressionValidatePipe())
  calculate(@Body() body: { expression: string }) {
    const result = this.calculatorService.calculate(body.expression);
    return { result };
  }
}
