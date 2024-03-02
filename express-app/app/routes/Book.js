const controller = require('../controllers/Book');
const router = require('express').Router();
const cacheNoStore = require('../middlewares/cacheNoStore')

router.get('/', cacheNoStore, controller.listBooks);
router.post('/add',cacheNoStore, controller.addBook);
router.post('/del', cacheNoStore, controller.deleteBook);
router.get('/by_name', cacheNoStore, controller.searchByName);
router.get('/by_genre',cacheNoStore, controller.searchByGenre);
router.get('/by_year',cacheNoStore, controller.searchByYear);
router.get('/by_coun',cacheNoStore, controller.searchByCountry);

module.exports = router;