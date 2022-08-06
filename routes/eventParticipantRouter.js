const eventParticipantRouter = require('express').Router()
const eventParticipantController = require('../controllers/eventParticipantController')

eventParticipantRouter.get('/', eventParticipantController.list)
eventParticipantRouter.post('/', eventParticipantController.create)
eventParticipantRouter.put('/:id', eventParticipantController.update)
eventParticipantRouter.delete('/:id', eventParticipantController.delete)
eventParticipantRouter.patch(
  '/upload-proof-of-payment/:id',
  eventParticipantController.upload_proof_of_payment,
)

module.exports = eventParticipantRouter
