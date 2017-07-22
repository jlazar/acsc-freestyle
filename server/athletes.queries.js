var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/acsc_db';
var db = pgp(connectionString);

// Athlete Functions *********************
function getAllAlthetes(req, res, next) {
  db.any('select * from athletes')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL athletes'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleAthlete(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('select * from athletes where id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE athlete'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createAthlete(req, res, next) {
  console.log(req.body)
  req.body.age = parseInt(req.body.age);
  db.none('insert into athletes(first_name, last_name, age, sex)' +
      'values(${first_name}, ${last_name}, ${age}, ${sex})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one athlete'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateAthlete(req, res, next) {
  db.none('update athletes set first_name=$1, last_name=$2, age=$3, sex=$4 where id=$5',
    [req.body.first_name, req.body.last_name, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated athlete'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeAthlete(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('delete from athletes where id = $1', id)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} athlete`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
  getAllAlthetes: getAllAlthetes,
  getSingleAthlete: getSingleAthlete,
  createAthlete: createAthlete,
  updateAthlete: updateAthlete,
  removeAthlete: removeAthlete
};