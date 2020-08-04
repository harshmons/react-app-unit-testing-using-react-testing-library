import React from 'react';
import { render } from '@testing-library/react';
import CounterCurrentValue from '../../components/CounterCurrentValue';

describe("<CounterCurrentValue />", () => {
  test('should renders `Counter current value` text with passed counter prop', () => {
    const { queryByText,debug } = render(<CounterCurrentValue counterValue="4" />);
    const text = queryByText(/Counter current value/i);
    expect(text).toHaveTextContent("Counter current value : 4")
  });

  test('should have correct class', () => {
      const { queryByText,debug } = render(<CounterCurrentValue counterValue="4" />);
      const text = queryByText(/Counter current value/i);
      
      // These are present in @testing-library/jest-dom/extend-expect
      // When we are not using plain css
      expect(text).toHaveClass("currentValueContainer")
      
      // When we are using css-modules or css-in-jss
      expect(text).toHaveAttribute('class', expect.stringContaining('Value'))
  });
})
  


