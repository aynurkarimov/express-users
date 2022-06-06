const db = require('../database/index');
const {isValidId, isValidBody} = require('../helpers/utils');

const getUsers = (req, res) => { 
  return res.status(200).setHeader('content-type', "application/json").json(db)
};

const getUser = (req, res) => {
  const {id} = req.params;

  if (!isValidId(id)) {
    return res.status(404)
      .setHeader('content-type', "application/json")
      .json({
        status: 404,
        message: 'Please provide ID'
      })
  }

  const user = db.find(user => user.id === Number(id));

  if (!user) {
    return res.status(200)
    .setHeader('content-type', "application/json")
    .json({})
  }

  return res.status(200)
  .setHeader('content-type', "application/json")
  .json(user);
}

const createUser = (req, res) => {
  const {body} = req;

  if (!isValidBody(body)) {
    return res.status(400).json({
      status: 400,
      message: 'Payload not provided'
    })
  }

  const {name, age} = body;

  if (!name || !age) {
    return res.status(400).json({
      status: 400,
      message: 'name/age field is not provided'
    })
  }

  const theLatestID = db.at(-1).id + 1;
  
  return res.status(201).json([
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
    res.status(404).json({
      status: 404,
      message: 'Provide proper ID'
    })
  }

  if (!isValidBody(body)) {
    return res.status(400).json({
      status: 400,
      message: 'Payload not provided'
    })
  }

  const isUserExist = db.find(user => user.id === Number(id));

  if (!isUserExist) {
    return res.status(200).json({
      status: 200,
      message: 'User doesnt exist'
    })
  }

  const updatedUser = {...isUserExist, ...body};
  const updatedDB = [
    ...db.filter(user => user.id !== Number(id)),
    updatedUser
  ];
  const sortedDB = updatedDB.sort((a, b) => a.id - b.id);

  return res.status(201).json(sortedDB)
}

const deletePerson = (req, res) => {
  const {id} = req.params;
  
  if (!isValidId(id)) {
    res.status(404).json({
      status: 404,
      message: 'Provide proper ID'
    })
  }

  const modifiedDB = db.filter(user => user.id !== Number(id));

  return res.status(201).json(modifiedDB);
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updatePerson,
  deletePerson
}