const { Router } = require('express');
const authController = require('../../controllers/authController');
const validation = require('../../middlewares/validator');
const { loginValidation } = require('../../validations/authValidation');

const router = Router();

router.post('/login', validation(loginValidation), authController.authLoginController);

module.exports = router;
