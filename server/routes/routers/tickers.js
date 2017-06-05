const {Router} = require('express');
const TickerController = require('../../controllers/ticker-controller');

const router = Router();
const tickerCtrl = new TickerController();

router.get('/:trainId', tickerCtrl.getOneTrain);
router.get('/:trainId/:number', tickerCtrl.getOneStation);
router.put('/:trainId/:number', tickerCtrl.updateOneTicker);
router.post('/:trainId', tickerCtrl.createOneTicker);
router.delete('/:trainId/:number', tickerCtrl.deleteTicker);

module.exports = router;