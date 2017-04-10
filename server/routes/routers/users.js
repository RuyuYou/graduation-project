const {Router} =require('express');
const UserController = require('../../controllers/user-controller');

const router = Router();
const userCtrl = new UserController();

router.get('/userName', userCtrl.getName);

module.exports = router;