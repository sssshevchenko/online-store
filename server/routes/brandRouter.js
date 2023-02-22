const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const roleMiddleware = require('../middlewares/roleMiddleware')

router.get('/', brandController.getAll)
router.post('/', roleMiddleware('ADMIN'), brandController.create)

module.exports = router