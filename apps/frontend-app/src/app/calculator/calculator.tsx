import { useCallback, useState } from 'react';
import CalculatorUi from '../calculator-ui/calculator-ui';
import styles from './calculator.module.scss';

/* eslint-disable-next-line */
export interface CalculatorProps {}

export function Calculator(props: CalculatorProps) {
  const [expression, setExpression] = useState('');
  const [restExpression, setRestExpression] = useState(false);
  const [value, setValue] = useState('');

  const onSubmitHandler = useCallback(async (expression: string) => {
    const rawResponse = await fetch('/api/calculate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ expression }),
    });

    if (!rawResponse.ok) 
    {
      const {message}  = await rawResponse.json();
      setExpression(message)
      setValue('');
      setRestExpression(true);
    }else{
      const { result } = await rawResponse.json();
      setValue(result || 0);
      setRestExpression(true);
    }
 
  }, []);

  
  const onClearHandler = () => {
    setExpression(''); 
    setValue('');
  }

  const onActionHandler = (value: string) => {
    if(restExpression){
      setExpression(value);
      setRestExpression(false);
    }else{
      setExpression( expression + value )
    }
  }

  return (
    <section>
      <header><h2 className={styles.title}>Calculator</h2> </header>
      <div className={styles.calculator}>
        <div className={styles.answerSection}>
          <div data-testid={'answerTop'} className={styles.answerTop}>{expression}</div>
          <div data-testid={'answerBottom'} className={styles.answerBottom}>{value}</div>
        </div>
        <CalculatorUi
          onAction={(value) => onActionHandler(value)}
          onNumber={(value) => onActionHandler(value)}
          onClear={() =>  onClearHandler() }
          onSubmit={() => expression && onSubmitHandler(expression)}
        />
      </div>
    </section>
  );
}

export default Calculator;
