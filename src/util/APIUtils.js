const RANDOM_COLOR_API_URL = 'https://cors-anywhere.herokuapp.com/https://www.colr.org/json/color/random';

const request = options => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const defaults = { headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error(response.text());
            }
        })
        .then(data => Promise.resolve(data ? JSON.parse(data) : {}))
        .catch(error => Promise.reject(JSON.parse(error)));
};

export function getRandomColor() {
    return request({
        url: RANDOM_COLOR_API_URL,
        method: 'GET'
    });
};