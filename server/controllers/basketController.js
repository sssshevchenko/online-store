const ApiError = require('../error/ApiError')
const { Basket, BasketDevice, Device } = require("../models/models")

class BasketController {
    async addDevice(req, res, next) {
        try {
            const {userId, deviceId} = req.body

            const basket = await Basket.findOne({where: {userId}})
            const basketDevice = await BasketDevice.create({basketId: basket.id, deviceId})
    
            return res.json(basketDevice)
        } catch(e) {
            next(ApiError.BadRequest('Failed to add device'))
        }
    } 

    async getDevices(req, res,next) {
        try {
            const {userId} = req.params

            const basket = await Basket.findOne({where: {userId}})
            const basketId = basket.id
            const basketDevice = await BasketDevice.findAll({where: {basketId}, include: [{model: Device, as: 'device'}]})
    
            return res.json(basketDevice)
        } catch(e) {
            next(ApiError.BadRequest('Failed to load devices'))
        }
    }

    async deleteDevice(req, res, next) {
        try {
            const {userId, deviceId} = req.body
            
            const basket = await Basket.findOne({where: {userId}})
            const basketId = basket.id
            const basketDevice = await BasketDevice.destroy({where: {deviceId, basketId}})
    
            return res.json(basketDevice)
        } catch(e) {
            next(ApiError.BadRequest('Failed removing device'))
        }
    }
}

module.exports = new BasketController()