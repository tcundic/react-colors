export const extendHex = shortHex =>
    '#' + shortHex
        .slice(1)
        .split('')
        .map(x => x + x)
        .join('');