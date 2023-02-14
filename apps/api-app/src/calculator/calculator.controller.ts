import { Body, Controller, Post } from '@nestjs/common';

import { CalculatorService } from './calculator.service';

@Controller('/calculate')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post()
  calculate(@Body() body: { expression: string }) {
    const result = this.calculatorService.calculate(body.expression);
    return { result };
  }
}
