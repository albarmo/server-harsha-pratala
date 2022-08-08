const articleRouter = require('express').Router()
const articleController = require('../controllers/articleControllers')
const { authorization, authentification } = require('../middleware/Auth')

articleRouter.get('/', articleController.list)
articleRouter.get('/:id', articleController.detail)
articleRouter.use(authentification)
articleRouter.use(authorization)
articleRouter.post('/', articleController.create)
articleRouter.put('/:id', articleController.update)
articleRouter.delete('/:id', articleController.delete)

module.exports = articleRouter
