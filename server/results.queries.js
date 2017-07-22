var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/acsc_db';
var db = pgp(connectionString);


// Results Functions *********************
function getAllResults(req, res, next) {
  db.any('select * from results')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL results'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleResult(req, res, next) {
  var athlete_id = parseInt(req.params.athlete_id);
  var event_id = parseInt(req.params.event_id);
  db.one('select * from results where athlete_id = $1 AND event_id = $2',[athlete_id, event_id])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE Result'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createResult(req, res, next) {
  req.body.event_id = parseInt(req.body.event_id);
  req.body.athlete_id = parseInt(req.body.athlete_id);
  req.body.score = parseFloat(req.body.score);
  db.none('insert into results(athlete_id, event_id, score)' +
    'values(${athlete_id}, ${event_id}, ${score})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one Result'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateResult(req, res, next) {
  db.none('update results set athlete_id=$1, event_id=$2, score=$3 where athlete_id = $4 AND event_id = $5',
    [parseInt(req.body.athlete_id), parseInt(req.body.event_id), parseFloat(req.body.score),
    parseInt(req.params.athlete_id), parseInt(req.params.event_id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Result'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeResult(req, res, next) {
  var athlete_id = parseInt(req.params.athlete_id);
  var event_id = parseInt(req.params.event_id);
  db.result('delete from results where athlete_id = $1 AND event_id = $2',[athlete_id, event_id])
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} result`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
  getAllResults: getAllResults,
  getSingleResult: getSingleResult,
  createResult: createResult,
  updateResult: updateResult,
  removeResult: removeResult,
};