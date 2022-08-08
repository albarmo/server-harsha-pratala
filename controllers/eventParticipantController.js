const { Events_Participants } = require('../models')
const uploader = require('../helpers/uploader')

class EventParticipantController {
  static async list(req, res) {
    try {
      const data = await Events_Participants.findAll({})
      if (data) {
        return res.status(200).json({ data })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static create(req, res) {
    try {
      // const upload = uploader('USERPROFILE_IMAGE').fields([
      //   { name: 'profile_picture' },
      // ])
      // upload(req, res, (err) => {
      //   if (err) {
      //     return res.status(500).json({ msg: err })
      //   }
      //   const { profile_picture } = req.files
      //   const imagePath = profile_picture
      //     ? '/' + profile_picture[0].filename
      //     : null

      let inputData = {
        event_id: req.body.event_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        profile_picture: req.body.profile_picture,
        registration_id: req.body.registration_id,
        registration_date: req.body.registration_date,
      }
      Events_Participants.create(inputData)
        .then((data) => {
          return res.status(201).json({ data })
        })
        .catch((error) => {
          return res.status(500).json({ message: error })
        })
      // })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static update(req, res) {
    try {
      const idEvent = req.params.id
      // const upload = uploader('ARTICLE_IMAGE').fields([{ name: 'tumbnail' }])
      // upload(req, res, (err) => {
      //   if (err) {
      //     return res.status(500).json({ msg: err })
      //   }
      //   const { tumbnail } = req.files
      //   const imagePath = tumbnail ? '/' + tumbnail[0].filename : null

      let inputDataUpdate = {
        event_id: req.body.event_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        profile_picture: req.body.profile_picture,
        registration_id: req.body.registration_id,
        registration_date: req.body.registration_date,
      }
      Events_Participants.update(inputDataUpdate, {
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
      // })
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }

  static upload_proof_of_payment(req, res) {
    try {
      const participant_id = req.params.id
      // const upload = uploader('PROOF_OF_PAYMENT').fields([
      //   { name: 'proof_of_payment' },
      // ])
      // upload(req, res, (err) => {
      //   if (err) {
      //     return res.status(500).json({ msg: err })
      //   }
      //   const { proof_of_payment } = req.files
      //   const imagePath = proof_of_payment
      //     ? '/' + proof_of_payment[0].filename
      //     : null

      let payload = {
        proof_of_payment: req.body.proof_of_payment,
      }
      Events_Participants.update(payload, {
        where: {
          id: participant_id,
        },
        returning: true,
        plain: true,
      })
        .then((data) => {
          return res.status(201).json({ result: data[1].proof_of_payment })
        })
        .catch((error) => {
          return res.status(500).json({ message: error })
        })
      // })
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }

  static async delete(req, res) {
    const idEvent = req.params.id
    const event = await Events_Participants.findOne({ where: { id: idEvent } })
    try {
      if (!event) {
        return res.status(404).json({ message: 'event data not found!' })
      } else {
        const response = await Events_Participants.destroy({
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

module.exports = EventParticipantController
