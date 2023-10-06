import {test, expect, vi} from 'vitest';
import {render} from '@testing-library/react'
import HeroCard from './HeroCard';
import {userEvent} from '@testing-library/user-event'
import { mockHero } from '../../mocks/resultsMock';
import { THero } from '../../types/hero';
import { Context } from '../../context/context';
import { dependencies } from '../../context/dependencies';


test('Should hero card rendering correctly', async () => {
    const rendered = render(
        <Context.Provider value={{...dependencies, pageCount: 1, setPageCount: vi.fn()}}>
            <HeroCard hero={mockHero} />
        </Context.Provider>
    )
    const cardTitle = await rendered.findByText(mockHero.name)
    expect(cardTitle).not.toBeNull()
    expect(await rendered.findByText(mockHero.description)).not.toBeNull()
    
    await userEvent.click(cardTitle);
    
    expect(await rendered.findByText(mockHero.series.items[0].name)).not.toBeNull()
})

test('Should hero description not found', async () => {
    const rendered = render(
        <Context.Provider value={{...dependencies, pageCount: 1, setPageCount: vi.fn()}}>
            <HeroCard hero={{...mockHero, description: ''}}  />
        </Context.Provider>
    )

    
    expect(await rendered.findAllByText(/Description not found/)).not.toBeNull()
})