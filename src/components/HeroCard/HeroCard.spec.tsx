import {test, expect} from 'vitest';
import {render} from '@testing-library/react'
import HeroCard from './HeroCard';
import {userEvent} from '@testing-library/user-event'
import { mockHero } from '../../mocks/resultsMock';
import { THero } from '../../types/hero';


test('Should hero card rendering correctly', async () => {
    const rendered = render(<HeroCard hero={mockHero} />)
    const cardTitle = await rendered.findByText(mockHero.name)
    expect(cardTitle).not.toBeNull()
    expect(await rendered.findByText(mockHero.description)).not.toBeNull()
    
    await userEvent.click(cardTitle);
    
    expect(await rendered.findByText(mockHero.series.items[0].name)).not.toBeNull()
    expect(await rendered.findByText(mockHero.events.items[0].name)).not.toBeNull()
})

test('Should hero description not found', async () => {
    const rendered = render(<HeroCard hero={{...mockHero, description: ''}} />)
    
    expect(await rendered.findAllByText(/Description not found/)).not.toBeNull()
})