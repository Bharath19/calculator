import { Test } from '@nestjs/testing';

import { CalculatorService } from './calculator.service';

describe('AppService', () => {
  let service: CalculatorService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [CalculatorService],
    }).compile();

    service = app.get<CalculatorService>(CalculatorService);
  });

  describe('calculate', () => {
    it('should return sum', () => {
      expect(service.calculate('1+2')).toEqual(3);
    });

    it('should return infixToPostfix expersion for 10*20/100-100+100', () => {
      expect(service.infixToPostfix('10*20/100-100+100')).toEqual([
        '10',
        '20',
        '*',
        '100',
        '/',
        '100',
        '-',
        '100',
        '+',
      ]);
    });

    it('should return infixToPostfix expersion for 10*20/100-100+100', () => {
      expect(
        service.evaluatePostfix([
          '10',
          '20',
          '*',
          '100',
          '/',
          '100',
          '-',
          '100',
          '+',
        ])
      ).toEqual(2);
    });

    it('should return infixToPostfix expersion for 10+10+(50/6)/56+100', () => {
      expect(service.infixToPostfix('10+10+(50/6)/56+100')).toEqual([
        '10',
        '10',
        '+',
        '50',
        '6',
        '/',
        '56',
        '/',
        '+',
        '100',
        '+',
      ]);
    });

    it('should return sum of 10+10+(50/6)/56', () => {
      expect(
        service.evaluatePostfix([
          '10',
          '10',
          '+',
          '50',
          '6',
          '/',
          '56',
          '/',
          '+',
          '100',
          '+',
        ])
      ).toEqual(120.14880952380952);
    });

    it('should return precedence for / and * operator', () => {
      expect(service.precedence('*')).toEqual(2);
      expect(service.precedence('/')).toEqual(2);
    });

    it('should return precedence for + and - operator', () => {
      expect(service.precedence('+')).toEqual(1);
      expect(service.precedence('-')).toEqual(1);
    });

    it('should return precedence for 1, 2 and dot operator', () => {
      expect(service.precedence('1')).toEqual(-1);
      expect(service.precedence('2')).toEqual(-1);
      expect(service.precedence('.')).toEqual(-1);
    });
  });
});
