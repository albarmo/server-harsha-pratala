const { Feedback } = require('../models')

class FeedbackControllers {
  static async list(req, res) {
    try {
      const data = await Feedback.findAll()
      if (data) {
        return res.status(200).json({ data })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async create(req, res) {
    try {
      const { email, message, date } = req.body
      const newFeedback = await Feedback.create({ email, message, date })
      if (!newFeedback) {
        return res.status(500).json({ message: error })
      } else {
        return res.status(201).json({ newFeedback })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async update(req, res) {
    try {
      const feedbackId = req.params.id
      const { email, message, date } = req.body
      const updateFeedback = await Feedback.update(
        { email, message, date },
        {
          where: {
            id: feedbackId,
          },
          returning: true,
        },
      )
      if (updateFeedback) {
        return res.status(201).json({ updateFeedback })
      }
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }

  static async delete(req, res) {
    const feedbackId = req.params.id
    try {
      const isExist = await Feedback.findOne({ where: { id: feedbackId } })
      if (!isExist) {
        return res.status(404).json({ message: 'Feedback data not found!' })
      } else {
        const deleteFeedbacks = await Feedback.destroy({
          where: {
            id: feedbackId,
          },
          returning: true,
        })
        if (deleteFeedbacks) {
          return res
            .status(200)
            .json({ status: `sucess deleted feedbacks ${feedbackId}` })
        }
      }
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }
}

module.exports = FeedbackControllers
