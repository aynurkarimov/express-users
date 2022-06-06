const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updatePerson,
  deletePerson
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);

module.exports = router;