const ApiError = require("../error/ApiError")
const { User, Basket } = require("../models/models")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, role} = req.body

            if(!email || !password) {
                return next(ApiError.BadRequest(`Password field and email field can't be empty`))
            }

            const candidate = await User.findOne({where: {email}})

            if(candidate) {
                return next(ApiError.BadRequest(`User with email adress - ${email} is already exists`))
            }

            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({email, password: hashPassword, role})
            const basket = await Basket.create({userId: user.id})

            const token = generateJwt(user.id, email, user.role)

            return res.json({token})
        } catch(e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({where: {email}})

            if(!user) {
                return next(ApiError.Internal(`User with email adress - ${email} not found`))
            }

            const decodedPassword = await bcrypt.compare(password, user.password)

            if(!decodedPassword) {
                return next(ApiError.Internal('Incorrect password'))
            }

            const token = generateJwt(user.id, email, user.role)

            return res.json({token})
        } catch(e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()