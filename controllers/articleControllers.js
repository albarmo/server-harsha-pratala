const { Articles } = require("../models");
const uploader = require("../helpers/uploader");

class ArticleController {
  static async list(req, res) {
    try {
      const data = await Articles.findAll();
      if (data) {
        return res.status(200).json({ data });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static create(req, res) {
    try {
      const upload = uploader("ARTICLE_IMAGE").fields([{ name: "image" }]);
      upload(req, res, (err) => {
        if (err) {
          console.log("gagal upload", err);
          return res.status(500).json({ msg: err });
        }
        const { image } = req.files;
        const imagePath = image ? "/" + image[0].filename : null;

        let inputData = {
          title: req.body.title,
          description: req.body.description,
          image: imagePath,
          content: req.body.content,
          topic_id: req.body.topic_id,
          tags_id: req.body.tags_id,
          date: new Date(),
          author_id: req.body.author_id,
          comment_id: req.body.comment_id,
          status: req.body.status,
        };
        Articles.create(inputData)
          .then((data) => {
            console.log(data);
            return res.status(201).json({ data });
          })
          .catch((error) => {
            return res.status(500).json({ message: error.message });
          });
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static update(req, res) {
    try {
      const idArticle = req.params.id;
      const upload = uploader("ARTICLE_IMAGE").fields([{ name: "image" }]);
      upload(req, res, (err) => {
        if (err) {
          console.log("gagal upload", err);
          return res.status(500).json({ msg: err });
        }
        const { image } = req.files;
        const imagePath = image ? "/" + image[0].filename : null;

        let inputDataUpdate = {
          title: req.body.title,
          description: req.body.description,
          image: imagePath,
          content: req.body.content,
          topic_id: req.body.topic_id,
          tags_id: req.body.tags_id,
          date: new Date(),
          author_id: req.body.author_id,
          comment_id: req.body.comment_id,
          status: req.body.status,
        };
        Articles.update(inputDataUpdate, {
          where: {
            id: idArticle,
          },
        })
          .then((data) => {
            console.log(data);
            return res.status(201).json({ data });
          })
          .catch((error) => {
            return res.status(500).json({ message: error.message });
          });
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    const idArticle = req.params.id;
    try {
      const deleteArticle = await Articles.destroy({
        where: {
          id: idArticle,
        },
      });
      return res
        .status(200)
        .json({ msg: `sucess deleted course ${deleteArticle}` });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
    //
  }
}

module.exports = ArticleController;
