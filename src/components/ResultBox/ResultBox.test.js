import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const testCases = [
    { amount: 100, from: 'PLN', to: 'USD', expectedOutput: 'PLN 100.00 = $28.57' },
    { amount: 20, from: 'USD', to: 'PLN', expectedOutput: '$20.00 = PLN 70.00' },
    { amount: 200, from: 'PLN', to: 'USD', expectedOutput: 'PLN 200.00 = $57.14' },
    { amount: 345, from: 'USD', to: 'PLN', expectedOutput: '$345.00 = PLN 1,207.50' },
];

const toPlnTestCases = [
    { amount: 50, from: 'USD', to: 'PLN', expectedOutput: '$50.00 = PLN 175.00' },
    { amount: 89.99, from: 'USD', to: 'PLN', expectedOutput: '$89.99 = PLN 314.97' },
    { amount: 500, from: 'USD', to: 'PLN', expectedOutput: '$500.00 = PLN 1,750.00' },
];

const sameCurrencyTestCases = [
    { amount: 123, from: 'PLN', to: 'PLN', expectedOutput: 'PLN 123.00 = PLN 123.00' },
    { amount: 456.78, from: 'USD', to: 'USD', expectedOutput: '$456.78 = $456.78' },
];

describe('Component ResultBox', () => {
    afterEach(cleanup);
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });

    it('should render proper info about conversion when PLN -> USD', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('PLN 100.00 = $28.57');
    });

    it('should render "Wrong value…" when amount is negative', () => {
        render(<ResultBox from="PLN" to="USD" amount={-100} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('Wrong value…');
    });

    for (const { amount, from, to, expectedOutput } of testCases) {
        it(`should render correct output for conversion from ${from} to ${to} with amount ${amount}`, () => {
            render(<ResultBox from={from} to={to} amount={amount} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(expectedOutput);
        });
    }

    for (const { amount, from, to, expectedOutput } of toPlnTestCases) {
        it(`should render correct output for conversion from ${from} to ${to} with amount ${amount}`, () => {
            render(<ResultBox from={from} to={to} amount={amount} />);
            const output = screen.getByTestId('output');
            expect(output.textContent).toBe(expectedOutput);
        });
    }

    for (const { amount, from, to, expectedOutput } of sameCurrencyTestCases) {
        it(`should render correct output when from and to are the same currency (${from})`, () => {
            render(<ResultBox from={from} to={to} amount={amount} />);
            const output = screen.getByTestId('output');
            expect(output.textContent).toBe(expectedOutput);
        });
    }

});