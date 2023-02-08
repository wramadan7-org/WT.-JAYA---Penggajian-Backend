const httpStatus = require('http-status');
const catchAsync = require('../helpers/catchAsync');
const karyawanService = require('../services/users/karyawan/karyawanService');

/**
 * Create karyawan
 */
const karyawanCreate = catchAsync(async (req, res) => {
  const request = req.body;

  const karyawan = await karyawanService.createUser(request);

  res.sendWrapped('Create user', karyawan, httpStatus.CREATED);
});

/**
 * Get all list of karyawan
 */
const karyawanList = catchAsync(async (req, res) => {
  const karyawan = await karyawanService.getUsers();
  res.sendWrapped('List Karyawan', karyawan, httpStatus.OK);
});

module.exports = {
  karyawanCreate,
  karyawanList,
};
