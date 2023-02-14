import { render } from '@testing-library/react';

import Calculator from './calculator';

describe('Calculator', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Calculator />);
    expect(baseElement).toBeTruthy();
  });

  it('should have the title', () => {
    const { getByText } = render(<Calculator />);
    expect(getByText(/Calculator/gi)).toBeTruthy();
  });
});
