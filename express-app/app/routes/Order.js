const controller = require('../controllers/Order');
const router = require('express').Router();
const cacheNoStore = require('../middlewares/cacheNoStore')

router.post('/add', cacheNoStore, controller.AddOrder);
router.get('/getAllOrders', cacheNoStore, controller.listOrder);
router.post('/postMaxOrder', cacheNoStore, controller.maxOrder);
router.post('/3mostPopularGenners', cacheNoStore, controller.popularOrders);
router.post('/profit', cacheNoStore, controller.totalProfit)
router.post('/5mostPopularAuthors', cacheNoStore, controller.popularAuthors);

module.exports = router;