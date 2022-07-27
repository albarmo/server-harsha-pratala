const { Bucket, Articles } = require('../models')
const uploader = require('../helpers/uploader')

class BucketController {
  static async getAllFile(req, res) {
    try {
      const file = await Bucket.findAll({})
      if (!file) {
        return res.status(404).json({ message: 'Bucket empty!' })
      } else {
        return res.status(200).json({ file })
      }
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }

  static async getFileById(req, res) {
    const id = req.params.id
    try {
      const file = await Bucket.findOne({ where: { id: id } })
      if (!file) {
        return res.status(404).json({ message: 'File not found!' })
      } else {
        return res.status(200).json({ file })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async getlistFile(req, res) {
    let inputData = {
      fileId: req.body.fileId,
    }

    try {
      const files = await Bucket.findAll({ where: { id: inputData.fileId } })
      if (files) {
        return res.status(200).json({ files })
      } else if (!file) {
        return res.status(404).json({ message: 'File not found!' })
      }
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }

  static async upload(req, res) {
    try {
      const upload = uploader('FILE_').fields([{ name: 'file' }])
      upload(req, res, async (err) => {
        if (err) {
          console.log('gagal upload', err)
          return res.status(500).json({ msg: err })
        }

        const { file } = req.files
        const filePath = file ? '/' + file[0].filename : null

        let inputData = {
          title: req.body.title,
          file: filePath,
          source_id: req.body.source_id,
        }

        if (filePath) {
          await Bucket.create(inputData)
            .then((data) => {
              return res.status(201).json({ data })
            })
            .catch((error) => {
              return res.status(500).json({ message: error })
            })
        }
      })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async delete(req, res) {
    const id = req.params.id
    const file = await Bucket.findOne({ where: { id: id } })

    try {
      if (!file) {
        return res.status(404).json({ message: 'file data not found!' })
      } else {
        await Bucket.destroy({
          where: {
            id: idArticle,
          },
          returning: true,
          plain: true,
        })
        return res.status(200).json({ msg: `sucess deleted file ${idArticle}` })
      }
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }
}

module.exports = BucketController
