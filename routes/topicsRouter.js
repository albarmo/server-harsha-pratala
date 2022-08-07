const topicsRouter = require('express').Router()
const topicsController = require('../controllers/topicControllers')
const { authorization, authentification } = require('../middleware/Auth')

topicsRouter.get('/', topicsController.list)
topicsRouter.use(authentification)
topicsRouter.use(authorization)
topicsRouter.post('/', topicsController.create)
topicsRouter.put('/:id', topicsController.update)
topicsRouter.delete('/:id', topicsController.delete)

module.exports = topicsRouter
