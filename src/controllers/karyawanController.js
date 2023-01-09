const httpStatus = require('http-status');

const karyawanList = (req, res) => {
  res.sendWrapped(
    'List Karyawan',
    [
      {
        nama: 'Wahyu Ramadan',
        umur: 20,
        posisi: 'karyawan pabrik',
      },
      {
        nama: 'Hanijah',
        umur: 32,
        posisi: 'dapur dan kebersihan',
      },
    ],
    httpStatus.OK,
  );
};

module.exports = {
  karyawanList,
};
