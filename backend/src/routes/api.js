const express = require('express');
const { getAllUsers, reinviteUser, registerUser, inviteUserByEmail, removeUserByEmail, deleteUserById } = require('../controllers/userController');

const router = express.Router();

router.post('/invite', inviteUserByEmail);
router.post('/register', registerUser);
router.post('/remove', removeUserByEmail);
router.delete('/users/:id', deleteUserById);
router.get('/users', getAllUsers);
router.post('/users/:id/reinvite', reinviteUser);

module.exports = router;