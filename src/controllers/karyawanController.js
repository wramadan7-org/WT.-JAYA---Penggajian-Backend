const httpStatus = require('http-status');
const BaseError = require('../helpers/baseError');
const catchAsync = require('../helpers/catchAsync');
const bcrypt = require('../helpers/bcrypt');
const karyawanService = require('../services/users/karyawan/karyawanService');
const helperService = require('../services/serviceHelper');

/**
 * Create karyawan
 */
const karyawanCreateController = catchAsync(async (req, res) => {
  const requestBody = req.body;
  const { email, phone, password } = requestBody;

  // Check the email is exist or not
  const checkUser = await helperService.findUserByEmail(email);

  if (checkUser) throw new BaseError('Email already exist', httpStatus.BAD_REQUEST);

  // Check the email is exist or not
  const checkPhone = await helperService.findUserByPhone(email);

  if (checkPhone) throw new BaseError('Phone already exist', httpStatus.BAD_REQUEST);

  const hash = await bcrypt.hashingPassword(password);

  const data = {
    ...requestBody,
    password: hash,
  };

  const karyawan = await karyawanService.createKaryawanService(data);

  res.sendWrapped('Create user', karyawan, httpStatus.CREATED);
});

/**
 * Get all list of karyawan
 */
const karyawanAllController = catchAsync(async (req, res) => {
  const karyawan = await karyawanService.getAllKaryawanService();
  res.sendWrapped('List Karyawan', karyawan, httpStatus.OK);
});

/**
 * Get karyawan by ID and Role(Optional)
 */
const karyawanByIdOrRoleController = catchAsync(async (req, res) => {
  const { id, role } = req.params;
  let karyawan;

  // If have param role then update spesifict value with that role
  if (role) {
    karyawan = await karyawanService.getKaryawanByIdAndRoleService(id, role);
  } else {
    karyawan = await karyawanService.getKaryawanByIdAndRoleService(id);
  }

  if (!karyawan) throw new BaseError(`Karyawan with ID ${id} not found`, httpStatus.NOT_FOUND);

  res.sendWrapped(`Karyawan with ID ${id}`, karyawan, httpStatus.OK);
});

/**
 * Update karyawan by ID
 */
const karyawanUpdateByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const requestBody = req.body;

  // Find karyawan with ID
  const findKaryawan = await karyawanService.getKaryawanByIdAndRoleService(id);

  if (!findKaryawan) throw new BaseError(`Karyawan with ID ${id} not found`, httpStatus.NOT_FOUND);

  // Check the another email
  if (requestBody.email) {
    if (requestBody.email !== findKaryawan.email) {
      const checkEmail = await helperService.findAnotherUserByEmailService(
        findKaryawan.id,
        requestBody.email,
      );

      if (checkEmail) throw new BaseError('Email already exist', httpStatus.CONFLICT);
    }
  }

  // Check the another phone
  if (requestBody.phone) {
    if (requestBody.phone !== findKaryawan.phone) {
      const checkPhone = await helperService.findAnotherUserByPhoneService(
        findKaryawan.id,
        requestBody.phone,
      );

      if (checkPhone) throw new BaseError('Phone already exist', httpStatus.CONFLICT);
    }
  }

  // Assign key value
  const data = Object.assign(findKaryawan, requestBody);
  const { dataValues } = data;

  const update = await karyawanService.updateKaryawanByIdService(id, dataValues);

  if (update[0] === 0) throw new BaseError(`Fail to update karyawan with ID ${id}`, httpStatus.CONFLICT);

  // Get karyawan with ID for response
  const responseKaryawan = await karyawanService.getKaryawanByIdAndRoleService(id);

  res.sendWrapped(`Update ID ${id} successfully`, responseKaryawan, httpStatus.OK);
});

/**
 * Delete karyawan by ID
 */
const karyawanDeleteByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const karyawan = await karyawanService.getKaryawanByIdAndRoleService(id);

  if (!karyawan) throw new BaseError(`Karyawan with ID ${id} not found`, httpStatus.NOT_FOUND);

  await karyawanService.deleteKaryawanByIdService(id);

  res.sendWrapped(`Delete karyawan with ID ${id} successfully`, karyawan, httpStatus.OK);
});

module.exports = {
  karyawanCreateController,
  karyawanAllController,
  karyawanByIdOrRoleController,
  karyawanUpdateByIdController,
  karyawanDeleteByIdController,
};
