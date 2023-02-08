const { Router } = require('express');
const karyawanController = require('../../controllers/karyawanController');

const router = Router();

router.post('/', karyawanController.karyawanCreate);
router.get('/', karyawanController.karyawanList);

module.exports = router;
