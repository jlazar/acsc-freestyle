const promise = require('bluebird');

const options = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://localhost:5432/acsc_db';
const db = pgp(connectionString);

// Results Functions *********************
async function getAllResults(req, res, next) {
  let data;
  try {
    data = await db.any('select * from results');
  } catch (err) {
    return next(err);
  }
  res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved ALL results'
    });
}

async function getSingleResult(req, res, next) {
  let athlete_id = parseInt(req.params.athlete_id),
    event_id = parseInt(req.params.event_id),
    data;
  try {
    data = await db.one('select * from results where athlete_id = $1 AND event_id = $2', [athlete_id, event_id]);
  } catch (err) {
    return next(err);
  }
  res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved ONE Result'
    });
}

async function createResult(req, res, next) {
  req.body.event_id = parseInt(req.body.event_id);
  req.body.athlete_id = parseInt(req.body.athlete_id);
  req.body.score = parseFloat(req.body.score);

  try {
    await db.none('insert into results(athlete_id, event_id, score)' +
      'values(${athlete_id}, ${event_id}, ${score})',
      req.body)
  } catch (err) {
    return next(err);
  }

  res.status(200)
    .json({
      status: 'success',
      message: 'Inserted one Result'
    });
}

async function updateResult(req, res, next) {
  try {
    await db.none('update results set athlete_id=$1, event_id=$2, score=$3 where athlete_id = $4 AND event_id = $5',
      [parseInt(req.body.athlete_id), parseInt(req.body.event_id), parseFloat(req.body.score),
      parseInt(req.params.athlete_id), parseInt(req.params.event_id)])
  } catch (err) {
    return next(err);
  }

  res.status(200)
    .json({
      status: 'success',
      message: 'Updated Result'
    });
}

async function removeResult(req, res, next) {
  let athlete_id = parseInt(req.params.athlete_id),
    event_id = parseInt(req.params.event_id);
    
  try {
    await db.result('delete from results where athlete_id = $1 AND event_id = $2', [athlete_id, event_id]);
  } catch (err) {
    return next(err);
  }

  res.status(200)
    .json({
      status: 'success',
      message: `Removed ${result.rowCount} result`
    });
}


module.exports = {
  getAllResults: getAllResults,
  getSingleResult: getSingleResult,
  createResult: createResult,
  updateResult: updateResult,
  removeResult: removeResult,
};