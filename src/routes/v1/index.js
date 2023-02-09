const { Router } = require('express');
const authRoute = require('./authRoute');
const karyawanRoute = require('./karyawanRoute');

const router = Router();

const defaultRoute = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/karyawan',
    route: karyawanRoute,
  },
];

defaultRoute.forEach((routerParam) => {
  router.use(routerParam.path, routerParam.route);
});

module.exports = router;
