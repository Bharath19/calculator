import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CalculatorUi from './calculator-ui';

describe('CalculatorUi', () => {
  it('renders the correct layout', () => {
    const onNumber = jest.fn();
    const onAction = jest.fn();
    const onSubmit = jest.fn();
    const onClear = jest.fn();
    const { getByText } = render(
      <CalculatorUi
        onNumber={onNumber}
        onAction={onAction}
        onSubmit={onSubmit}
        onClear={onClear}
      />
    );
    
    expect(getByText('(')).toBeInTheDocument();
    expect(getByText(')')).toBeInTheDocument();
    expect(getByText('%')).toBeInTheDocument();
    expect(getByText('+')).toBeInTheDocument();
    expect(getByText('-')).toBeInTheDocument();
    expect(getByText('/')).toBeInTheDocument();
    expect(getByText('x')).toBeInTheDocument();
    expect(getByText('C')).toBeInTheDocument();
    expect(getByText('9')).toBeInTheDocument();
    expect(getByText('7')).toBeInTheDocument();
    expect(getByText('6')).toBeInTheDocument();
    expect(getByText('5')).toBeInTheDocument();
    expect(getByText('4')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('0')).toBeInTheDocument();
  });

  it('calls the correct callbacks', () => {
    const onNumber = jest.fn();
    const onAction = jest.fn();
    const onSubmit = jest.fn();
    const onClear = jest.fn();
    const { getByText } = render(
      <CalculatorUi
        onNumber={onNumber}
        onAction={onAction}
        onSubmit={onSubmit}
        onClear={onClear}
      />
    );

    fireEvent.click(getByText('9'));
    expect(onNumber).toHaveBeenCalledWith('9');

    fireEvent.click(getByText('8'));
    expect(onNumber).toHaveBeenCalledWith('8');

    fireEvent.click(getByText('7'));
    expect(onNumber).toHaveBeenCalledWith('7');

    fireEvent.click(getByText('6'));
    expect(onNumber).toHaveBeenCalledWith('6');

    fireEvent.click(getByText('5'));
    expect(onNumber).toHaveBeenCalledWith('5');

    fireEvent.click(getByText('5'));
    expect(onNumber).toHaveBeenCalledWith('5');

    fireEvent.click(getByText('4'));
    expect(onNumber).toHaveBeenCalledWith('4');

    fireEvent.click(getByText('3'));
    expect(onNumber).toHaveBeenCalledWith('3');

    fireEvent.click(getByText('2'));
    expect(onNumber).toHaveBeenCalledWith('2');

    fireEvent.click(getByText('1'));
    expect(onNumber).toHaveBeenCalledWith('1');

    fireEvent.click(getByText('0'));
    expect(onNumber).toHaveBeenCalledWith('0');

    fireEvent.click(getByText('/'));
    expect(onAction).toHaveBeenCalledWith('/');

    // X - text displyed in screen
    fireEvent.click(getByText('x'));
    expect(onAction).toHaveBeenCalledWith('*');

    fireEvent.click(getByText('+'));
    expect(onAction).toHaveBeenCalledWith('+');

    fireEvent.click(getByText('-'));
    expect(onAction).toHaveBeenCalledWith('-');

    fireEvent.click(getByText('%'));
    expect(onAction).toHaveBeenCalledWith('%');

    fireEvent.click(getByText('C'));
    expect(onClear).toHaveBeenCalled();

    fireEvent.click(getByText('='));
    expect(onSubmit).toHaveBeenCalledWith('=');
  });
  
});