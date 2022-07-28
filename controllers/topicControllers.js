const { Topic, Articles } = require('../models')

class TopicsControllers {
  static async list(req, res) {
    try {
      const data = await Topic.findAll({ include: { model: Articles } })
      if (data) {
        return res.status(200).json({ data })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async create(req, res) {
    try {
      let inputData = {
        name: req.body.name,
      }
      const newTopic = await Topic.create(inputData)
      if (!newTopic) {
        return res.status(500).json({ message: error })
      } else {
        return res.status(201).json({ newTopic })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async update(req, res) {
    try {
      const topicId = req.params.id
      let inputDataUpdate = {
        name: req.body.name,
      }
      const updateTopic = await Topic.update(inputDataUpdate, {
        where: {
          id: topicId,
        },
        returning: true,
      })
      if (updateTopic) {
        return res.status(201).json({ updateTopic })
      }
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }

  static async delete(req, res) {
    const topicId = req.params.id
    try {
      const isExist = await Topic.findOne({ where: { id: topicId } })
      if (!isExist) {
        return res.status(404).json({ message: 'topic data not found!' })
      } else {
        const deleteTopics = await Topic.destroy({
          where: {
            id: topicId,
          },
          returning: true,
        })
        if (deleteTopics) {
          return res
            .status(200)
            .json({ status: `sucess deleted topic ${topicId}` })
        }
      }
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }
}

module.exports = TopicsControllers
