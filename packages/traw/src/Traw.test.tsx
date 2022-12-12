import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { Traw } from './Traw';

describe('Traw component', () => {
  const renderComponent = () => render(<Traw />);

  it('should render correctly', async () => {
    const { getByTestId } = renderComponent();

    const testComponent = getByTestId('traw');

    await waitFor(() => expect(testComponent).toBeInTheDocument());
  });
});
