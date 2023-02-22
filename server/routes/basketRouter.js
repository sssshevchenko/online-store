const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.get('/:userId', basketController.getDevices)

router.post('/', basketController.addDevice)

router.delete('/', basketController.deleteDevice)

module.exports = router