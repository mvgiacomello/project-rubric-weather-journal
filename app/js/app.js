// Retrieve data from OpenWeather API
const owApi = '46e6e57fbeb9039ae7712ae61ead551c';
const owApiString = location => `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${owApi}&units=metric`;

async function retrieveWeatherInfo(location) {
    const response = await fetch(owApiString(location));
    const jsonBody = await response.json();
    return jsonBody;
}

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

async function getData(url = '/api/data') {
    const response = await fetch(url, { method: 'GET' });
    const jsonBody = await response.json();
    return jsonBody;
}

document.getElementById('generate').addEventListener('click', () => {
    // Retrieve entered information
    const submitedLocation = document.getElementById('zip').value;
    const submitedFeeling = document.getElementById('feelings').value;

    // Api Calls
    retrieveWeatherInfo(submitedLocation).then(data => {
        return data.main.temp;
    }).then(weather => {
        const d = new Date();
        const newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;
        return postData({
            'temp': weather,
            'date': newDate,
            'response': submitedFeeling
        })
    }).then(_ => {
        return getData();
    }).then(alldata => {
        const lastEntry = alldata[alldata.length - 1];
        // Reset location and feeling
        document.getElementById('zip').value = "";
        document.getElementById('feelings').value = "";
        // Change most recent
        document.getElementById('date').innerHTML = lastEntry.date;
        document.getElementById('content').innerHTML = lastEntry.response;
        document.getElementById('temp').innerHTML = lastEntry.temp;
    })
})