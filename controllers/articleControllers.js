const { Articles, Tag, Topic, User, Bucket } = require("../models");
const uploader = require("../helpers/uploader");

class ArticleController {
  static async list(req, res) {
    try {
      const data = await Articles.findAll({
        include: [
          {
            model: User,
            attributes: ["email", "id"],
          },
          {
            model: Tag,
            attributes: ["id", "name"],
          },
        ],
      });
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
          topics: req.body.topics,
          tags: req.body.tags,
          date: new Date(),
          authors: req.body.authors,
          status: req.body.status,
          fileIds: req.body.fileIds,
        };
        Articles.create(inputData)
          .then((data) => {
            console.log(data);
            return res.status(201).json({ data });
          })
          .catch((error) => {
            return res.status(500).json({ message: error });
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
          topics: req.body.topics,
          tags: req.body.tags,
          date: new Date(),
          authors: req.body.authors,
          status: req.body.status,
          fileIds: req.body.fileIds,
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
            return res.status(500).json({ message: error });
          });
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async delete(req, res) {
    const idArticle = req.params.id;
    const article = await Articles.findOne({ where: { id: idArticle } });
    try {
      if (!article) {
        return res.status(404).json({ message: "article data not found!" });
      } else {
        const deleteArticle = await Articles.destroy({
          where: {
            id: idArticle,
          },
          returning: true,
          plain: true,
        });
        return res
          .status(200)
          .json({ msg: `sucess deleted article ${idArticle}` });
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

module.exports = ArticleController;
