const eventRouter = require('express').Router()
const eventController = require('../controllers/eventControllers')
const { authorization, authentification } = require('../middleware/Auth')

eventRouter.get('/', eventController.list)
eventRouter.use(authentification)
eventRouter.use(authorization)
eventRouter.post('/', eventController.create)
eventRouter.put('/:id', eventController.update)
eventRouter.delete('/:id', eventController.delete)

module.exports = eventRouter
