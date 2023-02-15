import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CalculatorController } from './calculator.controller';
import { CalculatorService } from './calculator.service';

describe('CalculatorController', () => {
  let app: TestingModule;
  let calculatorController: CalculatorController;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [CalculatorController],
      providers: [CalculatorService],
    }).compile();
    calculatorController = app.get<CalculatorController>(CalculatorController);
  });

  describe('calculate', () => {
    it('should return sum of 1+2', () => {
      expect(calculatorController.calculate({ expression: '1+2' })).toEqual({
        result: 3,
      });
    });

    it('should return sum of 100+12/23*23', () => {
      expect(
        calculatorController.calculate({ expression: '100+12/23*23' })
      ).toEqual({
        result: 112,
      });
    });

    it('should return sum of 10+10+(50/6)/56', () => {
      expect(
        calculatorController.calculate({ expression: '10+10+(50/6)/56' })
      ).toEqual({
        result: 20.148809523809526,
      });
    });

    it('should return sum of 10+10+(50/6)/56', () => {
      expect(
        calculatorController.calculate({ expression: '10+10+(50/6)/56' })
      ).toEqual({
        result: 20.148809523809526,
      });
    });

    it('should throw bad request if invalid expression', () => {
      expect(() =>
        calculatorController.calculate({ expression: '10+12-' })
      ).toThrow(new BadRequestException('Invalid Request'));
    });

    it('should throw bad request if invalid operator', () => {
      expect(() =>
        calculatorController.calculate({ expression: '10+12^' })
      ).toThrow(new BadRequestException('Invalid Request'));
    });
  });
});
