import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';
import { render, screen, cleanup } from '@testing-library/react';

describe('Component CurrencyForm', () => {
  it('should run action callback with proper data on form submit for each test case', () => {
    const testCases = [
      { amount: '100', from: 'PLN', to: 'USD' },
      { amount: '20', from: 'USD', to: 'PLN' },
      { amount: '200', from: 'PLN', to: 'USD' },
      { amount: '345', from: 'USD', to: 'PLN' },
    ];

    for (const testObj of testCases) {
      const action = jest.fn();

      render(<CurrencyForm action={action} />);

      const amountField = screen.getByTestId('amount');
      const fromField = screen.getByTestId('from-select');
      const toField = screen.getByTestId('to-select');
      const submitButton = screen.getByText('Convert');

      userEvent.type(amountField, testObj.amount);
      userEvent.selectOptions(fromField, testObj.from);
      userEvent.selectOptions(toField, testObj.to);

      userEvent.click(submitButton);

      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith({amount: parseInt(testObj.amount, 10), from: testObj.from, to: testObj.to,});

      cleanup();
    }
  });
});
