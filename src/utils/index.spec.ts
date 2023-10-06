import { expect, test, vi } from 'vitest';

import { generatePaginationList, getSearchParams } from '.';

const mockAssign = vi.fn()

const makeSut = () => {
    window = Object.create(window);
    const url = "http://localhost:5174/?page=1&q=mock+search";
    Object.defineProperty(window, 'location', {
    value: {
        href: url,
        search: '?page=1&q=mock search',
        assign: mockAssign
    },
    writable: true
    });
}

test.each([
    [1, 20, [ 1, 2, 3, 4, 5, '...', 20 ]],
    [21, 30, [ 21, 22, 23, 24, 25, '...', 30 ]],
    [15, 20, [ 14, 15, 16, 17, 18, 19, 20 ]],
    [17, 20, [ 14, 15, 16, 17, 18, 19, 20 ]],
])('should generate correct pagination list', (startAt, size, expected) => {
    expect(generatePaginationList(startAt, size)).toEqual(expected);
});


test.each([
    [1, 20, [ 1, 2, '...', 20 ]],
    [21, 30, [ 21, 22, '...', 30 ]],
    [15, 20, [ 15, 16, '...', 20 ]],
    [17, 20, [ 17, 18, 19, 20 ]],
])('should generate correct pagination list in mobile', (startAt, size, expected) => {
    window.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));
    expect(generatePaginationList(startAt, size)).toEqual(expected);
});

test('should get search params', () => {
    makeSut()

    const searchParams = getSearchParams()

    expect(searchParams).toEqual('q=mock search')
})