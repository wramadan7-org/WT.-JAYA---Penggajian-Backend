const { Router } = require('express');
const karyawanController = require('../../controllers/karyawanController');
const validation = require('../../middlewares/validator');
const { createKaryawanValidation } = require('../../validations/karyawanValidation');

const router = Router();

router.post('/', validation(createKaryawanValidation), karyawanController.karyawanCreateController);
router.get('/', karyawanController.karyawanAllController);
router.get('/:id', karyawanController.karyawanByIdOrRoleController);
router.patch('/:id', karyawanController.karyawanUpdateByIdController);

module.exports = router;
