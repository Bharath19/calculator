import { useCallback, useEffect, useState } from 'react';
import CalculatorUi from '../calculator-ui/calculator-ui';
import styles from './calculator.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CalculatorProps {}

const Calculator: React.FC<CalculatorProps> = () => {
  const [expression, setExpression] = useState('');
  const [value, setValue] = useState('');
  const [restExpression, setRestExpression] = useState(false);

  const onSubmitHandler = useCallback(async (expression: string) => {
    try {
      const rawResponse = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression }),
      });

      if (!rawResponse.ok) {
        const { message } = await rawResponse.json();
        setExpression(message);
        setValue('');
        setRestExpression(true);
      } else {
        const { result } = await rawResponse.json();
        setValue(result || '0');
        setRestExpression(true);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onClearHandler = useCallback(() => {
    setExpression('');
    setValue('');
  }, []);

  const onActionHandler = useCallback(
    (value: string) => {
      if (restExpression) {
        setExpression(value);
        setRestExpression(false);
      } else {
        setExpression(expression + value);
      }
    },
    [expression, restExpression]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      const isNumber = /[0-9]/.test(key);
      const isAction = /[-+*/()=%]/.test(key);
  
      if (isNumber) {
        setExpression(expression + key);
      } else if (isAction) {
        setExpression(expression + key);
      } else if (key === 'Enter') {
        expression && onSubmitHandler(expression);
      } else if (key === 'Escape') {
        onClearHandler();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [expression, onClearHandler, onSubmitHandler]);

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
};

export default Calculator;
