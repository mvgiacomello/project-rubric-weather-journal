// Retrieve data from OpenWeather API
const owApi = '';
const owApiString = location => `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${owApi}&units=metric`;

async function retrieveWeatherInfo(location) {
    const response = await fetch(owApiString(location));
    const jsonBody = await response.json();
    return jsonBody;
}

retrieveWeatherInfo('London').then(data => {
    console.log(data);
})

// Send data to server
async function postData(data = {}, url = '/api/data') {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const jsonBody = await response.json();
    return jsonBody;
}

postData({ answer: 42 }).then(data => {
    console.log(data);
});


// Retrieve data from server
async function getData(url = '/api/data') {
    const response = await fetch(url, { method: 'GET' });
    const jsonBody = await response.json();
    return jsonBody;
}

getData().then(data => {
    console.log(data);
})
