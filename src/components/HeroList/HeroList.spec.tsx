import { test, expect, describe, vi, beforeEach, afterEach } from 'vitest'
import mockAxios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios'
import { mockHero, mockResponse } from '../../mocks/resultsMock';
import {render, screen} from '@testing-library/react';

import HeroList from './HeroList';
import { Context } from '../../context/context';
import { dependencies } from '../../context/dependencies';
import {userEvent} from '@testing-library/user-event';

vi.mock('axios')
const mAxiosGet = vi.mocked(mockAxios.get, true);

const mockAssign = vi.fn();
const mockSetPageCount = vi.fn();

const makeSut = () => {
    window = Object.create(window);
    const url = "http://localhost:5174/page=1&q=mock hero";
    Object.defineProperty(window, 'location', {
    value: {
        href: url,
        search: '?page=1&q=mock hero',
        assign: mockAssign
    },
    writable: true
    });
}

describe('HeroList Component', async () => {

    makeSut()
    test('should list rendering succesfully', async () => {
        const response = {data: {...mockResponse}, status: 200} as AxiosResponse
        mAxiosGet.mockResolvedValue(response)

        const rendered = render(
            <Context.Provider value={{...dependencies, pageCount: 0, setPageCount: mockSetPageCount}}>
                <HeroList  />
            </Context.Provider>
        )
        const heroTitle = await screen.findByText(mockHero.name)
        expect(heroTitle).not.toBeNull()
        expect(await screen.findByText(mockHero.description)).not.toBeNull()
            
        await userEvent.click(heroTitle)

        expect(await screen.findAllByText(mockHero.series.items[0].name)).not.toBeNull()

        expect(mockSetPageCount).toBeCalledWith(157)

        expect(mAxiosGet).toBeCalledWith('characters?offset=0&limit=10&nameStartsWith=mock+hero')

        rendered.unmount()
    })
    test('should error occurred in fetch heroes', () => {
        
        const mResponse: AxiosResponse= {
            status:400,
            statusText:'Bad Request',
            headers:{},
            config:{
                headers: {} as AxiosRequestHeaders
            },
            data:{customErrorData:{
                status: 400,
                type: 'bad request',
            },
            },
        }
        
        const errorResponse = {
            response: mResponse,
            isAxiosError: true,
        };
        mAxiosGet.mockRejectedValue(mResponse)

        render(
            <Context.Provider value={{...dependencies, pageCount: 10, setPageCount: mockSetPageCount}}>
                <HeroList  />
            </Context.Provider>
        )
        
        const heroTitle = screen.queryByText(mockHero.name)

        expect(heroTitle).toBeNull()
        expect(screen.queryByText(mockHero.description)).toBeNull()
            

        expect(screen.queryByText(mockHero.series.items[0].name)).toBeNull()
        expect(screen.queryByText(mockHero.events.items[0].name)).toBeNull()
        
    })

    

    
    
})