const { Articles, Tag, Topic, User, Bucket, Storage } = require('../models')
const sequelize = require('sequelize')

class ArticleController {
  static async list(req, res) {
    const {
      is_public,
      status,
      type,
      topic_id,
      tag_id,
      title,
      limit,
    } = req.query
    const params = {}
    if (is_public) {
      params['is_public'] = is_public
    }
    if (status) {
      params['status'] = status
    }
    if (type) {
      params['type'] = type
    }
    if (topic_id) {
      params['topic_id'] = topic_id
    }
    if (tag_id) {
      params['tag_id'] = tag_id
    }
    if (title) {
      params['title'] = sequelize.where(
        sequelize.fn('LOWER', sequelize.col('title')),
        'LIKE',
        '%' + title.toLowerCase() + '%',
      )
    }
    try {
      const data = await Articles.findAll({
        limit: limit,
        order: [['createdAt', 'DESC']],
        where: { ...params },
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
        ],
      })

      if (data) {
        return res.status(200).json({ data })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async detail(req, res) {
    const idArticle = req.params.id
    try {
      const data = await Articles.findOne({
        where: { id: idArticle },
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
            model: Storage,
            as: 'StorageForArticle',
            attributes: ['id', 'file', 'type', 'title'],
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
    let inputData = {
      is_public: req.body.is_public,
      status: req.body.status,
      type: req.body.type,
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      tumbnail: req.body.tumbnail,
      topic_id: req.body.topic_id,
      tag_id: req.body.tag_id,
      publisher_id: req.body.publisher_id,
    }
    try {
      // const upload = uploader('ARTICLE_IMAGE').fields([{ name: 'tumbnail' }])
      // upload(req, res, (err) => {
      //   if (err) {
      //     return res.status(500).json({ msg: err })
      //   }
      //   const { tumbnail } = req.files
      //   const imagePath = tumbnail ? '/' + tumbnail[0].filename : null

      Articles.create(inputData)
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
      const idArticle = req.params.id
      // const upload = uploader('ARTICLE_IMAGE').fields([{ name: 'tumbnail' }])
      // upload(req, res, (err) => {
      //   if (err) {
      //     return res.status(500).json({ msg: err })
      //   }
      //   const { tumbnail } = req.files
      //   const imagePath = tumbnail ? '/' + tumbnail[0].filename : null

      let inputDataUpdate = {
        is_public: req.body.is_public,
        status: req.body.status,
        type: req.body.type,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        tumbnail: req.body.tumbnail,
        topic_id: req.body.topic_id,
        tag_id: req.body.tag_id,
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
      // })
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
