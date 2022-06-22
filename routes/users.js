const router = require('express').Router();
const { celebrate } = require('celebrate');
const { updateProfileValidation } = require('../utils/joiValidators');

const {
  getOurUser, updateProfile,
} = require('../controllers/users');

router.get('/me', getOurUser);
router.patch('/me', celebrate(updateProfileValidation), updateProfile);

module.exports = router;
