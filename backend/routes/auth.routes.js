const authController = require('../controllers/auth.controller');

module.exports = [
  {
    method: 'POST',
    path: '/register',
    handler: authController.register
  }
];