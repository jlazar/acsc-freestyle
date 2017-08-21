const promise = require('bluebird');

const options = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://localhost:5432/acsc_db';
const db = pgp(connectionString);

// Athlete Functions *********************
async function getAllAlthetes(req, res, next) {
  let data;
  try {
    data = await db.any('select * from athletes');
  } catch (err) {
    return next(err);
  }
  res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved ALL athletes'
    });
}

async function getSingleAthlete(req, res, next) {
  let id = parseInt(req.params.id),
    data;
  try {
    data = await db.one('select * from athletes where id = $1', id);
  } catch (err) {
    return next(err);
  }
  res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved ONE athlete'
    });
}

async function createAthlete(req, res, next) {
  req.body.age = parseInt(req.body.age);
  try {
    await db.none('insert into athletes(first_name, last_name, age, sex)' +
      'values(${first_name}, ${last_name}, ${age}, ${sex})',
      req.body)
  } catch (err) {
    return next(err);
  }

  res.status(200)
    .json({
      status: 'success',
      message: 'Inserted one athlete'
    });
}

async function updateAthlete(req, res, next) {
  try {
    await db.none('update athletes set first_name=$1, last_name=$2, age=$3, sex=$4 where id=$5',
      [req.body.first_name, req.body.last_name, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
  } catch (err) {
    return next(err);
  }
  res.status(200)
    .json({
      status: 'success',
      message: 'Updated athlete'
    });
}

async function removeAthlete(req, res, next) {
  let id = parseInt(req.params.id);
  try {
    await db.result('delete from athletes where id = $1', id)
  }
  catch (err) {
    return next(err);
  }

  res.status(200)
    .json({
      status: 'success',
      message: `Removed ${result.rowCount} athlete`
    });
}


module.exports = {
  getAllAlthetes: getAllAlthetes,
  getSingleAthlete: getSingleAthlete,
  createAthlete: createAthlete,
  updateAthlete: updateAthlete,
  removeAthlete: removeAthlete
};