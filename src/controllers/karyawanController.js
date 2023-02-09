const httpStatus = require('http-status');
const { BaseError } = require('sequelize');
const catchAsync = require('../helpers/catchAsync');
const karyawanService = require('../services/users/karyawan/karyawanService');

/**
 * Create karyawan
 */
const karyawanCreateController = catchAsync(async (req, res) => {
  const request = req.body;

  const karyawan = await karyawanService.createKaryawanService(request);

  res.sendWrapped('Create user', karyawan, httpStatus.CREATED);
});

/**
 * Get all list of karyawan
 */
const karyawanAllController = catchAsync(async (req, res) => {
  const karyawan = await karyawanService.getAllKaryawanService();
  res.sendWrapped('List Karyawan', karyawan, httpStatus.OK);
});

const karyawanByIdOrRole = catchAsync(async (req, res) => {
  const { id, role } = req.params;
  let karyawan;

  if (role) {
    karyawan = await karyawanService.getKaryawanByIdAndRole(id, role);
  } else {
    karyawan = await karyawanService.getKaryawanByIdAndRole(id);
  }

  if (!karyawan) throw new BaseError(`Karyawan with ID ${id} not found`, httpStatus.NOT_FOUND);

  res.sendWrapped(`Karyawan with ID ${id}`, karyawan, httpStatus.OK);
});

module.exports = {
  karyawanCreateController,
  karyawanAllController,
  karyawanByIdOrRole,
};
