import { render } from '@testing-library/react';

import CalculatorUi from './calculator-ui';

describe('CalculatorUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <CalculatorUi
        onAction={jest.fn()}
        onClear={jest.fn()}
        onNumber={jest.fn()}
        onSubmit={jest.fn()}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
