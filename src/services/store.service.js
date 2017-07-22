import expressService from './express.service.js';

var store = {
    events: null,
    athletes: null,
    results : null
};

function updateData() {
    expressService.getEvents().then((response) => {
        if(response) {
            store.events = response.data;
            checkStore();
        }
    });

    expressService.getAthletes().then((response) => {
        if(response) {
            store.athletes = response.data;
            checkStore();
        }
    });

    expressService.getResults().then((response) => {
        if(response) {
            store.results = response.data;
            checkStore();
        }
    });
}

function checkStore() {
    if(store.athletes && store.results && store.events){
        updateView();
    }
}

function updateView() {
    console.log(store);
}

//start it off
updateData();

export default store;