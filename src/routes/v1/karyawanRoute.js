const { Router } = require('express');
const karyawanController = require('../../controllers/karyawanController');

const router = Router();

router.get('/', karyawanController.karyawanList);

module.exports = router;
