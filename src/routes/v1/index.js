const { Router } = require('express');
const karyawanRoute = require('./karyawanRoute');

const router = Router();

const defaultRoute = [
  {
    path: '/karyawan',
    route: karyawanRoute,
  },
];

defaultRoute.forEach((routerParam) => {
  router.use(routerParam.path, routerParam.route);
});

module.exports = router;
