import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calculator from './calculator';

describe('Calculator component', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Calculator />);
    expect(baseElement).toBeTruthy();
  });

  it('should have the title', () => {
    const { getByText } = render(<Calculator />);
    expect(getByText(/Calculator/gi)).toBeTruthy();
  });

  it('calls the API and displays the result', async () => {
    const mockResponse = { result: 6 };
    (window as any).fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    render(<Calculator />);
    const button4 = screen.getByTestId('4');
    fireEvent.click(button4);
    await waitFor(() => expect(screen.getByTestId('answerTop')).toBeInTheDocument());  
    
    const addButton = await screen.getByTestId('+');
    fireEvent.click(addButton);
    await waitFor(() => expect(screen.getByTestId('answerTop')).toBeInTheDocument());
    
    const button2 = await screen.getByTestId('2');
    fireEvent.click(button2);
    await waitFor(() => expect(screen.getByTestId('answerTop')).toBeInTheDocument());

    const submitButton = await screen.getByTestId('=');
    fireEvent.click(submitButton);
    await waitFor(() => expect(screen.getByTestId('answerBottom').innerHTML).toEqual('6'));
    
    // Verify that the API was called with the correct expression
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith('/api/calculate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ expression: '4+2' }),
    });
  });


  it('displays an error message for invalid expressions', async () => {
    const mockResponse = { message: 'Invalid expression' };
    (window as any).fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(mockResponse),
      })
    );

    render(<Calculator />);
    const button1 = screen.getByTestId('1');
    fireEvent.click(button1);
    await waitFor(() => expect(screen.getByTestId('answerTop')).toBeInTheDocument());  
    
    const addButton = await screen.getByTestId('.');
    fireEvent.click(addButton);
    await waitFor(() => expect(screen.getByTestId('answerTop')).toBeInTheDocument());
    
    const submitButton = await screen.getByTestId('=');
    fireEvent.click(submitButton);
    await waitFor(() => expect(screen.getByTestId('answerTop').innerHTML).toEqual('Invalid expression'));

    // Verify that the API was called with the correct expression
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith('/api/calculate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ expression: '1.' }),
    });
  });

});
