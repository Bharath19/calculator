/* eslint-disable prefer-const */
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  // Method to evaluate a postfix expression
  evaluatePostfix(exp: string[]) {
    let stack = [];

    for (let i = 0; i < exp.length; i++) {
      const val = exp[i];

      if (!isNaN(parseFloat(val))) {
        stack.push(parseFloat(val));
      } else {
        const num1 = stack.pop();
        const num2 = stack.pop();

        if (num1 == null || num2 == null) {
          throw new BadRequestException('Invalid Request');
        }

        switch (val) {
          case '+':
            stack.push(num2 + num1);
            break;

          case '-':
            stack.push(num2 - num1);
            break;

          case '/':
            stack.push(num2 / num1);
            break;

          case '*':
            stack.push(num2 * num1);
            break;

          case '%':
            stack.push(num2 % num1);
            break;
          default:
            throw new BadRequestException('Invalid Request');
        }
      }
    }
    return stack.pop();
  }

  //Function to return precedence of operators
  precedence(c) {
    if (c == '/' || c == '*') return 2;
    else if (c == '+' || c == '-') return 1;
    else return -1;
  }

  //Generate Postfix expression as array
  infixToPostfix(exp: string): string[] {
    let stack = [];
    let result = [];
    let canAppendFlag = false;

    for (let i = 0; i < exp.length; i++) {
      const c = exp[i];

      if ((c >= '0' && c <= '9') || c == '.') {
        if (result.length == 0 || canAppendFlag) {
          result.push(c);
          canAppendFlag = false;
        } else {
          result[result.length - 1] = result[result.length - 1] + c;
        }
      } else if (c == '(') {
        stack.push('(');
        canAppendFlag = true;
      } else if (c == ')') {
        canAppendFlag = true;
        while (stack.length > 0 && stack[stack.length - 1] != '(') {
          result.push(stack.pop());
        }
        stack.pop();
      } else {
        canAppendFlag = true;
        while (
          stack.length > 0 &&
          this.precedence(c) <= this.precedence(stack[stack.length - 1])
        ) {
          result.push(stack.pop());
        }
        stack.push(c);
      }
    }

    while (stack.length != 0) {
      result.push(stack[stack.length - 1]);
      stack.pop();
    }

    return result;
  }

  calculate(expression: string) {
    const postfixExpression = this.infixToPostfix(expression);
    return this.evaluatePostfix(postfixExpression);
  }
}
