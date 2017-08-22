const promise = require('bluebird');

const options = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://localhost:5432/acsc_db';
const db = pgp(connectionString);

// Event Functions *********************
async function getAllEvents(req, res, next) {
  let data;
  try {
    data = await db.any('select * from events');
  } catch (err) {
    return next(err);
  }
  res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved ALL events'
    });
}

async function getSingleEvent(req, res, next) {
  let id = parseInt(req.params.id),
    data;
  try {
    data = await db.one('select * from events where id = $1', id);
  } catch (err) {
    return next(err);
  }
  res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved ONE event'
    });
}

async function createEvent(req, res, next) {
  try {
    await db.none('insert into events(location, event_date)' +
      'values(${location}, ${event_date})',
      req.body)
  } catch (err) {
    return next(err);
  }

  res.status(200)
    .json({
      status: 'success',
      message: 'Inserted one event'
    });
}

async function updateEvent(req, res, next) {
  try {
    await db.none('update events set location=$1, event_date=$2 where id=$3',
      [req.body.location, req.body.event_date, parseInt(req.params.id)])
  } catch (err) {
    return next(err);
  }
  res.status(200)
    .json({
      status: 'success',
      message: 'Updated event'
    });
}

async function removeEvent(req, res, next) {
  let id = parseInt(req.params.id);
  try {
    await db.result('delete from events where id = $1', id)
  }
  catch (err) {
    return next(err);
  }

  res.status(200)
    .json({
      status: 'success',
      message: `Removed ${result.rowCount} event`
    });
}


module.exports = {
  getAllEvents: getAllEvents,
  getSingleEvent: getSingleEvent,
  createEvent: createEvent,
  updateEvent: updateEvent,
  removeEvent: removeEvent
};