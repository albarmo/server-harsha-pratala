const { Tag, Articles } = require("../models");
const articles = require("../models/articles");

class TagsController {
  static async list(req, res) {
    try {
      const data = await Tag.findAll({ include: { model: Articles } });
      if (data) {
        return res.status(200).json({ data });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async create(req, res) {
    try {
      let inputData = {
        name: req.body.name,
        articleId: req.body.articleId,
      };
      const newTag = await Tag.create(inputData);
      if (!newTag) {
        return res.status(500).json({ message: error });
      } else {
        return res.status(201).json({ newTag });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const tagId = req.params.id;
      let inputDataUpdate = {
        name: req.body.name,
        articleId: req.body.articleId,
      };
      const updateTag = await Tag.update(inputDataUpdate, {
        where: {
          id: tagId,
        },
        returning: true,
      });
      if (updateTag) {
        return res.status(201).json({ updateTag });
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async delete(req, res) {
    const tagId = req.params.id;
    try {
      const isExist = await Tag.findOne({ where: { id: tagId } });
      if (!isExist) {
        return res.status(404).json({ message: "tag data not found!" });
      } else {
        const deleteTags = await Tag.destroy({
          where: {
            id: tagId,
          },
          returning: true,
        });
        if (deleteTags) {
          return res
            .status(200)
            .json({ status: `sucess deleted tags ${tagId}` });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

module.exports = TagsController;
