const controller = require('../controllers/User');
const router = require('express').Router();
const cacheNoStore = require('../middlewares/cacheNoStore')

router.get('/', cacheNoStore, controller.UserList);
router.post('/add', cacheNoStore, controller.addUser);
router.post('/del', cacheNoStore, controller.deleteUser);
router.post('/addOrder', cacheNoStore, controller.addOrderes);
router.post('/delorder', cacheNoStore, controller.delOrderes);
router.get(`/check/:name`,cacheNoStore, controller.FindUser)
module.exports = router;