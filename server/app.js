// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

//router query functions

const athletes = require('./athletes.queries');
const events = require('./events.queries');
const results = require('./results.queries');

let router = express.Router();

//parse the form data
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

router.get('/athletes', athletes.getAllAlthetes);
router.get('/athletes/:id', athletes.getSingleAthlete);
router.post('/athletes', athletes.createAthlete);
router.put('/athletes/:id', athletes.updateAthlete);
router.delete('/athletes/:id', athletes.removeAthlete);

router.get('/events', events.getAllEvents);
router.get('/events/:id', events.getSingleEvent);
router.post('/events', events.createEvent);
router.put('/events/:id', events.updateEvent);
router.delete('/events/:id', events.removeEvent);

router.get('/results', results.getAllResults);
router.get('/results/:athlete_id/:event_id', results.getSingleResult);
router.post('/results', results.createResult);
router.put('/results/:athlete_id/:event_id', results.updateResult);
router.delete('/results/:athlete_id/:event_id', results.removeResult);

app.use('/api', router);

let home = __dirname.split('/server')[0];
app.use(express.static(path.join(home, 'build')));

module.exports = app;