const baseURL = '/api/scores';

function getScores() {
    return fetch(baseURL).then(response => response.json());
};

function addScore(data) {
    return fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify(data) 
    }).then(response => response.json()); 
};

// eslint-disable-next-line
export default { getScores, addScore }