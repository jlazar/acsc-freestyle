import 'whatwg-fetch';


const HOST = 'http://localhost:3000';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

function parseJSON(response) {
    return response.json()
}
function getAthletes() {
    let methodType = 'GET';
    let url = HOST + '/api/athletes';
    return fetch(url,
        {
            method: methodType,
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(function (data) {
            return data
        }).catch(function (error) {
            console.log('request failed', error)
        });
}

function getResults() {
    let methodType = 'GET';
    let url = HOST + '/api/results';
    return fetch(url,
        {
            method: methodType,
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(function (data) {
            return data
        }).catch(function (error) {
            console.log('request failed', error)
        });
}

function getEvents() {
    let methodType = 'GET';
    let url = HOST + '/api/events';
    return fetch(url,
        {
            method: methodType,
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(function (data) {
            return data
        }).catch(function (error) {
            console.log('request failed', error)
        });
}

function updateEvent(event_id, requestBody) {
    let methodType = 'POST';
    let body = JSON.stringify(requestBody);
    let url = HOST + '/api/events/' + event_id;
    return fetch(url,
        {
            method: methodType,
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(function (data) {
            return data
        }).catch(function (error) {
            console.log('request failed', error)
        });
}

export default {
    getAthletes: getAthletes,
    getResults: getResults,
    getEvents: getEvents,
    updateEvent: updateEvent
}