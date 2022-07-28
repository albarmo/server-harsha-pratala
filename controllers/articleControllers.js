const { Articles, Tag, Topic, User, Bucket } = require('../models')
const uploader = require('../helpers/uploader')

class ArticleController {
  static async list(req, res) {
    try {
      const data = await Articles.findAll({
        include: [
          {
            model: User,
            attributes: ['id'],
          },
          {
            model: Tag,
            attributes: ['id', 'name'],
          },
          {
            model: Topic,
            attributes: ['id', 'name'],
          },
          {
            model: Bucket,
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
          type: req.body.type,
          title: req.body.title,
          description: req.body.description,
          content: req.body.content,
          tumbnail: imagePath,
          topic_id: req.body.topic_id,
          tag_id: req.body.tag_id,
          attachments: req.body.attachments,
          publisher_id: req.body.publisher_id,
        }
        Articles.create(inputData)
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
      const idArticle = req.params.id
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
          type: req.body.type,
          title: req.body.title,
          description: req.body.description,
          content: req.body.content,
          tumbnail: imagePath,
          topic_id: req.body.topic_id,
          tag_id: req.body.tag_id,
          attachments: req.body.attachments,
          publisher_id: req.body.publisher_id,
        }
        Articles.update(inputDataUpdate, {
          where: {
            id: idArticle,
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
    const idArticle = req.params.id
    const article = await Articles.findOne({ where: { id: idArticle } })
    try {
      if (!article) {
        return res.status(404).json({ message: 'article data not found!' })
      } else {
        const response = await Articles.destroy({
          where: {
            id: idArticle,
          },
          returning: true,
          plain: true,
        })
        return res
          .status(200)
          .json({ msg: `sucess deleted article ${idArticle}`, response })
      }
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }
}

module.exports = ArticleController
