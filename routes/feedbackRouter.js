const feedbackRouter = require('express').Router()
const feedbackController = require('../controllers/feedbackController')

feedbackRouter.get('/', feedbackController.list)
feedbackRouter.post('/', feedbackController.create)
feedbackRouter.put('/:id', feedbackController.update)
feedbackRouter.delete('/:id', feedbackController.delete)

module.exports = feedbackRouter
