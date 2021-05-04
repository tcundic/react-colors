const RANDOM_COLOR_API_URL = 'http://localhost:5000/json/color/random';

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
        url: `${RANDOM_COLOR_API_URL}?${new Date().getTime()}`,
        method: 'GET'
    });
};