import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  // Method to evaluate a postfix expression
  evaluatePostfix(exp: string[]) {
    // eslint-disable-next-line prefer-const
    let stack = [];

    // Read all values one by one
    for (let i = 0; i < exp.length; i++) {
      const val = exp[i];

      // If the character is operand, push it to the stack.
      if (!isNaN(parseFloat(val))) {
        stack.push(parseFloat(val));
      }
      //  If the character is an operator, pop two elements from stack apply the operator
      else {
        const num1 = stack.pop();
        const num2 = stack.pop();

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
    // eslint-disable-next-line prefer-const
    let stack = [];
    // eslint-disable-next-line prefer-const
    let result = [];
    let canAppendFlag = false;

    for (let i = 0; i < exp.length; i++) {
      const c = exp[i];

      // If the character is operand, push it to the stack.
      if ((c >= '0' && c <= '9') || c == '.') {
        if (result.length == 0 || canAppendFlag) {
          result.push(c);
          canAppendFlag = false;
        }
        // if number have more than one char/digit, append the resule together
        else {
          result[result.length - 1] = result[result.length - 1] + c;
        }
      }
      // If the character is ‘(‘, push it to the stack.
      else if (c == '(') {
        stack.push('(');
        canAppendFlag = true;
      }

      // If the character is ‘)’, pop and to output string from the stack until an ‘(‘ is encountered.
      else if (c == ')') {
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

    // Pop all the remaining elements from the stack
    while (stack.length != 0) {
      result.push(stack[stack.length - 1]);
      stack.pop();
    }

    return result;
  }

  calculate(expression: string) {
    // convert arithmetic expression to postfix expression
    const postfixExpression = this.infixToPostfix(expression);
    //  evaluate postfix expression
    console.log(postfixExpression);
    console.log(this.evaluatePostfix(postfixExpression));

    return this.evaluatePostfix(postfixExpression);
  }
}
