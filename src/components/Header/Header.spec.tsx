import {test, expect} from 'vitest';
import {render, screen} from '@testing-library/react'
import Header from './Header';

test('Should name correctly appears in header', () => {
    const rendered = render(<Header  />)

    expect(screen.getByText(/Felipe Okino/i)).not.toBeNull()
})