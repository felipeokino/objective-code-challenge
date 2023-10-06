import { expect, test } from 'vitest';

import { generatePaginationList } from '.';

test.each([
    [1, 20, [1, 2, '...', 20]],
    [21, 30, [21, 22, '...', 30]],
    [15, 20, [15, 16, '...', 20]],
    [17, 20, [17, 18, 19, 20]],
])('should generate correct pagination list', (startAt, size, expected) => {
    expect(generatePaginationList(startAt, size)).toEqual(expected);
});