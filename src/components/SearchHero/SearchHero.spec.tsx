import { render, screen } from '@testing-library/react';

import { test, expect, describe, vi } from 'vitest'
import SearchHero from './Searchhero';
import {userEvent} from '@testing-library/user-event'
import mockAxios from 'axios'


const mockAssign = vi.fn();

const makeSut = () => {
    window = Object.create(window);
    const url = "http://localhost:5174/?page=1";
    Object.defineProperty(window, 'location', {
    value: {
        href: url,
        search: '?page=1',
        assign: mockAssign
    },
    writable: true
    });
}
describe('SearchHero Component', () => { 
    makeSut()
    test('should fetch hero by name', async () => {
        const mockHeroName = "Mock Name"
        render(<SearchHero  />)

        const input = await screen.findByPlaceholderText(/Search.../)
        expect(input).not.toBeNull();

        await userEvent.type(input, mockHeroName)
        const searchBtn = await screen.findByTestId('searchBtn')

        expect(input).property('value', mockHeroName);
        expect(searchBtn).not.toBeNull()

        
        await userEvent.click(searchBtn)
        expect(mockAssign).toBeCalledWith(`?page=1&q=${mockHeroName}`)

    });


 })