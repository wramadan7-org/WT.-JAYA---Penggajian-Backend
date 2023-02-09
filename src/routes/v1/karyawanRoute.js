const { Router } = require('express');
const karyawanController = require('../../controllers/karyawanController');

const router = Router();

router.post('/', karyawanController.karyawanCreateController);
router.get('/', karyawanController.karyawanAllController);
router.get('/:id', karyawanController.karyawanByIdOrRole);

module.exports = router;
