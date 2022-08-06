const { Events, Events_Participants } = require('../models')
const uploader = require('../helpers/uploader')

class EventController {
  static async list(req, res) {
    try {
      const data = await Events.findAll({
        include: [
          {
            model: Events_Participants,
          },
        ],
      })
      if (data) {
        return res.status(200).json({ data })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static create(req, res) {
    try {
      const upload = uploader('ARTICLE_IMAGE').fields([{ name: 'tumbnail' }])
      upload(req, res, (err) => {
        if (err) {
          return res.status(500).json({ msg: err })
        }
        const { tumbnail } = req.files
        const imagePath = tumbnail ? '/' + tumbnail[0].filename : null

        let inputData = {
          is_public: req.body.is_public,
          status: req.body.status,
          title: req.body.title,
          description: req.body.description,
          content: req.body.content,
          tumbnail: imagePath,
          price: req.body.price,
          event_date: req.body.event_date,
          registration_open_date: req.body.registration_open_date,
          quota: req.body.quota,
          publisher_id: req.body.publisher_id,
        }
        Events.create(inputData)
          .then((data) => {
            return res.status(201).json({ data })
          })
          .catch((error) => {
            return res.status(500).json({ message: error })
          })
      })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static update(req, res) {
    try {
      const idEvent = req.params.id
      const upload = uploader('ARTICLE_IMAGE').fields([{ name: 'tumbnail' }])
      upload(req, res, (err) => {
        if (err) {
          return res.status(500).json({ msg: err })
        }
        const { tumbnail } = req.files
        const imagePath = tumbnail ? '/' + tumbnail[0].filename : null

        let inputDataUpdate = {
          is_public: req.body.is_public,
          status: req.body.status,
          title: req.body.title,
          description: req.body.description,
          content: req.body.content,
          tumbnail: imagePath,
          price: req.body.price,
          event_date: req.body.event_date,
          registration_open_date: req.body.registration_open_date,
          quota: req.body.quota,
          publisher_id: req.body.publisher_id,
        }
        Events.update(inputDataUpdate, {
          where: {
            id: idEvent,
          },
          returning: true,
          plain: true,
        })
          .then((data) => {
            return res.status(201).json({ result: data[1] })
          })
          .catch((error) => {
            return res.status(500).json({ message: error })
          })
      })
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }

  static async delete(req, res) {
    const idEvent = req.params.id
    const event = await Events.findOne({ where: { id: idEvent } })
    try {
      if (!event) {
        return res.status(404).json({ message: 'event data not found!' })
      } else {
        const response = await Events.destroy({
          where: {
            id: idEvent,
          },
          returning: true,
          plain: true,
        })
        return res
          .status(200)
          .json({ msg: `sucess deleted event ${idEvent}`, response })
      }
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }
}

module.exports = EventController
