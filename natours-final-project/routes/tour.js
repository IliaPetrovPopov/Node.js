const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  modifyTour,
  deleteTour,
  checkId,
  checkBody,
} = require('../controllers/tour');

const router = express.Router();

router.param('id', checkId);

router.route('/').get(getAllTours).post(checkBody, createTour);
router.route('/:id?').get(getTour).patch(modifyTour).delete(deleteTour);

module.exports = router;
