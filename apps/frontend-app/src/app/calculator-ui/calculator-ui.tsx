import { useMemo } from 'react';
import styles from './calculator-ui.module.scss';

export interface CalculatorUiProps {
  onNumber: (value: string) => void;
  onAction: (value: string) => void;
  onSubmit: (value: string) => void;
  onClear: () => void;
}

const CalculatorUi = ({
  onNumber,
  onAction,
  onSubmit,
  onClear,
}: CalculatorUiProps) => {
  const layout = useMemo(
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

  const getCallBackFn = (type: string) => {
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

  const getStyles = (type: string) => {
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
