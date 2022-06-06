const db = require('../database/index');
const {isValidId, isValidBody} = require('../helpers/utils');
const {STATUS_CODE} = require('../helpers/constants');

const getUsers = (req, res) => { 
  return res.status(STATUS_CODE.OK).setHeader('content-type', "application/json").json(db)
};

const getUser = (req, res) => {
  const {id} = req.params;

  if (!isValidId(id)) {
    return res.status(STATUS_CODE.NOT_FOUND)
      .setHeader('content-type', "application/json")
      .json({
        status: STATUS_CODE.NOT_FOUND,
        message: 'Please provide ID'
      })
  }

  const user = db.find(user => user.id === Number(id));

  if (!user) {
    return res.status(STATUS_CODE.OK)
    .setHeader('content-type', "application/json")
    .json({})
  }

  return res.status(STATUS_CODE.OK)
  .setHeader('content-type', "application/json")
  .json(user);
}

const createUser = (req, res) => {
  const {body} = req;

  if (!isValidBody(body)) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: 'Payload not provided'
    })
  }

  const {name, age} = body;

  if (!name || !age) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: 'name/age field is not provided'
    })
  }

  const theLatestID = db.at(-1).id + 1;
  
  return res.status(STATUS_CODE.CREATED).json([
    ...db,
    {
      id: theLatestID,
      name: name,
      age: age,
    }
  ])
}

const updatePerson = (req, res) => {
  const {id} = req.params;
  const {body} = req;

  if (!isValidId(id)) {
    res.status(STATUS_CODE.NOT_FOUND).json({
      status: STATUS_CODE.NOT_FOUND,
      message: 'Provide proper ID'
    })
  }

  if (!isValidBody(body)) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: 'Payload not provided'
    })
  }

  const isUserExist = db.find(user => user.id === Number(id));

  if (!isUserExist) {
    return res.status(STATUS_CODE.OK).json({
      status: STATUS_CODE.OK,
      message: 'User doesnt exist'
    })
  }

  const updatedUser = {...isUserExist, ...body};
  const updatedDB = [
    ...db.filter(user => user.id !== Number(id)),
    updatedUser
  ];
  const sortedDB = updatedDB.sort((a, b) => a.id - b.id);

  return res.status(STATUS_CODE.CREATED).json(sortedDB)
}

const deletePerson = (req, res) => {
  const {id} = req.params;
  
  if (!isValidId(id)) {
    res.status(STATUS_CODE.NOT_FOUND).json({
      status: STATUS_CODE.NOT_FOUND,
      message: 'Provide proper ID'
    })
  }

  const modifiedDB = db.filter(user => user.id !== Number(id));

  return res.status(STATUS_CODE.CREATED).json(modifiedDB);
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updatePerson,
  deletePerson
}