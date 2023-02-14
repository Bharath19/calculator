import { Test, TestingModule } from '@nestjs/testing';

import { CalculatorController } from './calculator.controller';
import { CalculatorService } from './calculator.service';

describe('CalculatorController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [CalculatorController],
      providers: [CalculatorService],
    }).compile();
  });

  describe('calculate', () => {
    it('should return sum of 1+2', () => {
      const calculatorController =
        app.get<CalculatorController>(CalculatorController);
      expect(calculatorController.calculate({ expression: '1+2' })).toEqual({
        result: 3,
      });
    });

    it('should return sum of 100+12/23*23', () => {
      const calculatorController =
        app.get<CalculatorController>(CalculatorController);
      expect(
        calculatorController.calculate({ expression: '100+12/23*23' })
      ).toEqual({
        result: 112,
      });
    });

    it('should return sum of 10+10+(50/6)/56', () => {
      const calculatorController =
        app.get<CalculatorController>(CalculatorController);
      expect(
        calculatorController.calculate({ expression: '10+10+(50/6)/56' })
      ).toEqual({
        result: 20.148809523809526,
      });
    });

    it('should return sum of 10+10+(50/6)/56', () => {
      const calculatorController =
        app.get<CalculatorController>(CalculatorController);
      expect(
        calculatorController.calculate({ expression: '10+10+(50/6)/56' })
      ).toEqual({
        result: 20.148809523809526,
      });
    });
  });
});
