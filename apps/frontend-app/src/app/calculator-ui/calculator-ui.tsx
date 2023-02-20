import { useEffect, useMemo } from 'react';
import styles from './calculator-ui.module.scss';

export interface CalculatorUiProps {
  onNumber: (value: string) => void;
  onAction: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
}

interface Button {
  name: string;
  type: 'number' | 'action' | 'reset' | 'submit';
  value?: string;
}

const CalculatorUi = ({
  onNumber,
  onAction,
  onSubmit,
  onClear,
}: CalculatorUiProps) => {
  const layout = useMemo<Button[][]>(
    () => [
      [
        { name: '(', type: 'action' },
        { name: ')', type: 'action' },
        { name: '%', type: 'action' },
        { name: 'C', type: 'reset' },
      ],
      [
        { name: '7', type: 'number' },
        { name: '8', type: 'number' },
        { name: '9', type: 'number' },
        { name: '/', type: 'action' },
      ],
      [
        { name: '4', type: 'number' },
        { name: '5', type: 'number' },
        { name: '6', type: 'number' },
        { name: 'x', value: '*', type: 'action' },
      ],
      [
        { name: '1', type: 'number' },
        { name: '2', type: 'number' },
        { name: '3', type: 'number' },
        { name: '-', type: 'action' },
      ],
      [
        { name: '0', type: 'number' },
        { name: '.', type: 'number' },
        { name: '=', type: 'submit' },
        { name: '+', type: 'action' },
      ],
    ],
    []
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      const isNumber = /[0-9]/.test(key);
      const isAction = /[-+*/()=%]/.test(key);
  
      if (isNumber) {
        onNumber(key);
      } else if (isAction) {
        onAction(key);
      } else if (key === 'Enter') {
        onSubmit();
      } else if (key === 'Escape') {
        onClear();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onAction, onClear, onNumber, onSubmit]);


  const getCallBackFn = (type: string): ((value: string) => void) => {
    switch (type) {
      case 'action':
        return onAction;
      case 'reset':
        return onClear;
      case 'submit':
        return onSubmit;
      default:
        return onNumber;
    }
  };

  const getStyles = (type: string): string => {
    switch (type) {
      case 'reset':
      case 'action':
        return [styles.cell, styles.cellAction].join(' ');
      case 'submit':
        return [styles.cell, styles.cellSubmit].join(' ');
      default:
        return [styles.cell, styles.cellNumber].join(' ');
    }
  };
  

  return (
    <table className={styles.table}>
      <tbody>
        {layout.map((columns) => (
          <tr key={Math.random() * 100}>
            {columns.map((column) => {
              const classNames = getStyles(column.type);
              const callBackFn = getCallBackFn(column.type);

              return (
                <td key={column.name}>
                  <div
                    data-testid={column.name}
                    className={classNames}
                    onClick={() => callBackFn(column.value ?? column.name)}
                  >
                    {column.name}
                  </div>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CalculatorUi;
