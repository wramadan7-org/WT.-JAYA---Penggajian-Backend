const { Router } = require('express');
const karyawanController = require('../../controllers/karyawanController');
const validation = require('../../middlewares/validator');
const { createKaryawanValidation, updateKaryawanValidation } = require('../../validations/karyawanValidation');

const router = Router();

router.post('/', validation(createKaryawanValidation), karyawanController.karyawanCreateController);
router.get('/', karyawanController.karyawanAllController);
router.get('/:id', karyawanController.karyawanByIdOrRoleController);
router.patch('/:id', validation(updateKaryawanValidation), karyawanController.karyawanUpdateByIdController);
router.delete('/:id', karyawanController.karyawanDeleteByIdController);

module.exports = router;
