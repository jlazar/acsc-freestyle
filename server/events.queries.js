var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/acsc_db';
var db = pgp(connectionString);


// Event Functions *********************
function getAllEvents(req, res, next) {
  db.any('select * from events')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL events'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleEvent(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('select * from events where id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE event'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createEvent(req, res, next) {
  console.log(req.body)
  // req.body.age = parseInt(req.body.age);
  db.none('insert into events(location, event_date)' +
      'values(${location}, ${event_date})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one event'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateEvent(req, res, next) {
  db.none('update events set location=$1, event_date=$2 where id=$3',
    [req.body.location, req.body.event_date, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated event'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeEvent(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('delete from events where id = $1', id)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} event`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
  getAllEvents: getAllEvents,
  getSingleEvent: getSingleEvent,
  createEvent: createEvent,
  updateEvent: updateEvent,
  removeEvent: removeEvent
};