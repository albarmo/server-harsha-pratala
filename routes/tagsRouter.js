const tagsRouter = require('express').Router()
const tagsController = require('../controllers/tagControllers')
const { authorization, authentification } = require('../middleware/Auth')

tagsRouter.get('/', tagsController.list)
tagsRouter.use(authentification)
tagsRouter.use(authorization)
tagsRouter.post('/', tagsController.create)
tagsRouter.put('/:id', tagsController.update)
tagsRouter.delete('/:id', tagsController.delete)

module.exports = tagsRouter
