const { Op } = require('sequelize');
const { User } = require('../../../models');

/**
 * Service create karyawan
 * @param {Object} data
 * @returns Object
 */
const createKaryawanService = async (data) => {
  const karyawan = await User.create(data);

  return karyawan;
};

/**
 * Service get all karyawan
 * @returns Array
 */
const getAllKaryawanService = () => User.findAll();

/**
 * Service get karyawan by ID and Role
 * @param {Number} id
 * @param {String} role
 * @returns Object
 */
const getKaryawanByIdAndRoleService = async (id, role) => {
  const karyawan = role ? User.findOne({ where: { id, role } }) : User.findOne({ where: { id } });

  return karyawan;
};

/**
 * Service update karyawan by ID
 * @param {Number} id
 * @param {Object} data
 * @returns Array
 */
const updateKaryawanByIdService = async (id, data) => {
  const karyawan = await User.update(data, {
    where: {
      id,
    },
  });

  return karyawan;
};

/**
 * Service delete karyawan by ID
 * @param {Number} id
 * @returns Object
 */
const deleteKaryawanByIdService = async (id) => {
  const karyawan = await User.destroy({ where: { id } });

  return karyawan;
};

module.exports = {
  createKaryawanService,
  getAllKaryawanService,
  getKaryawanByIdAndRoleService,
  updateKaryawanByIdService,
  deleteKaryawanByIdService,
};
