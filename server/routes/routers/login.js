const {Router} =require('express');
const LoginController = require('../../controllers/user-controller');

const router = Router();
const loginCtrl = new LoginController();

router.post('/', loginCtrl.login);
// router.post('/', loginCtrl.create);

module.exports = router;