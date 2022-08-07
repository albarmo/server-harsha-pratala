const recruitmentRouter = require('express').Router()
const recruitmentController = require('../controllers/recruitmentControllers')
const { authorization, authentification } = require('../middleware/Auth')

recruitmentRouter.get('/', recruitmentController.list)
recruitmentRouter.use(authentification)
recruitmentRouter.post('/', recruitmentController.create)
recruitmentRouter.put('/:id', recruitmentController.update)
recruitmentRouter.delete('/:id', recruitmentController.delete)

module.exports = recruitmentRouter
