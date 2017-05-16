const {Router} =require('express');
const LoginController = require('../../controllers/login-controller');

const router = Router();
const loginCtrl = new LoginController();

router.post('/', loginCtrl.login);
router.get('/userName', loginCtrl.getName);

module.exports = router;