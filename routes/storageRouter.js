const storageRouter = require('express').Router()
const StorageController = require('../controllers/storageControllers')
const { authorization, authentification } = require('../middleware/Auth')

storageRouter.get('/', StorageController.list)
storageRouter.use(authentification)
storageRouter.use(authorization)
storageRouter.get('/:id', StorageController.detail)
storageRouter.post('/', StorageController.upload)
storageRouter.put('/:id', StorageController.update)
storageRouter.delete('/:id', StorageController.delete)

module.exports = storageRouter
