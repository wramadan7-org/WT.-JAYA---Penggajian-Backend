const { Op } = require('sequelize');
const { User } = require('../../../models');

/**
 * Service create karyawan
 * @param {Object} data
 * @returns Object
 */
const createKaryawanService = async (data) => {
  const user = await User.create(data);

  return user;
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
const getKaryawanByIdAndRole = async (id, role) => {
  const user = role ? User.findOne({ where: { id, role } }) : User.findOne({ where: { id } });

  return user;
};

module.exports = {
  createKaryawanService,
  getAllKaryawanService,
  getKaryawanByIdAndRole,
};
