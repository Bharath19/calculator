import { useCallback, useState } from 'react';
import CalculatorUi from '../calculator-ui/calculator-ui';
import styles from './calculator.module.scss';

/* eslint-disable-next-line */
export interface CalculatorProps {}

export function Calculator(props: CalculatorProps) {
  const [expression, setExpression] = useState('');
  const [value, setValue] = useState('');

  const onSubmit = useCallback(async (expression: string) => {
    const rawResponse = await fetch('/api/calculate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ expression }),
    });
    const { result } = await rawResponse.json();

    setValue(result || 0);
  }, []);

  // console.log(expression);

  return (
    <section>
      <header><h2 className={styles.title}>Calculator</h2> </header>
      <div className={styles.calculator}>
        <div className={styles.answerSection}>
          <div className={styles.answerTop}>{expression}</div>
          <div className={styles.answerBottom}>{value}</div>
        </div>
        <CalculatorUi
          onAction={(value) => setExpression(expression + value)}
          onNumber={(value) => setExpression(expression + value)}
          onClear={() => setExpression('')}
          onSubmit={() => onSubmit(expression)}
        />
      </div>
    </section>
  );
}

export default Calculator;
