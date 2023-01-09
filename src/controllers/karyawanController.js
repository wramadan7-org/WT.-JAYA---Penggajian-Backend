const httpStatus = require('http-status');

const karyawanList = (req, res) => {
  res.send({
    code: 200,
    data: {
      nama: 'Wahyu Ramadan',
      umur: 22,
    },
  }).status(httpStatus.OK);
};

module.exports = {
  karyawanList,
};
