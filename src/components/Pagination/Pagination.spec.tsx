import { test, expect, describe, vi, beforeEach } from 'vitest'
import {render, screen} from '@testing-library/react';

import Pagination from './Pagination';
import {userEvent} from '@testing-library/user-event'
import { Context } from '../../context/context';
import { dependencies } from '../../context/dependencies';

const mockAssign = vi.fn();

const makeSut = () => {
    window = Object.create(window);
    const url = "http://localhost:5174/?page=1";
    Object.defineProperty(window, 'location', {
    value: {
        href: url,
        search: '?page=1&q=fake hero',
        assign: mockAssign
    },
    writable: true
    });
}



describe('Pagination Component', () => {
    makeSut()


    test('should pagination component rendering correctly', async () => {
        const rendered = render(
            <Context.Provider value={{ ...dependencies, pageCount: 1, setPageCount: vi.fn()}}>
                <Pagination  />
            </Context.Provider>
        )

        expect(await screen.findByText('1')).not.toBeNull()  
        
        rendered.unmount()
    })
    
    test('should pagination component rendering correctly', async () => {
        render(
            <Context.Provider value={{ ...dependencies, pageCount: 20, setPageCount: vi.fn()}}>
                <Pagination  />
            </Context.Provider>
        )

        expect(await screen.findByText('1')).not.toBeNull()
        expect(await screen.findByText('2')).not.toBeNull()
        expect(await screen.findByText('...')).not.toBeNull()
        expect(await screen.findByText('20')).not.toBeNull()

        await userEvent.click(await screen.findByText('2'))
        expect(mockAssign).toBeCalledWith("/?page=2&q=fake hero")
    })

})