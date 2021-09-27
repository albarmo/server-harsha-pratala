const { Vegetasi } = require("../models");
const uploader = require("../helpers/uploader");

class VegetasiController {
  static async list(req, res) {
    try {
      const data = await Vegetasi.findAll();
      if (data) {
        return res.status(200).json({ data });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static create(req, res) {
    try {
      const upload = uploader("VEGETASI_PDF").fields([{ name: "image" }]);
      upload(req, res, (err) => {
        if (err) {
          console.log("gagal upload", err);
          return res.status(500).json({ msg: err });
        }

        const { image } = req.files;
        const filePath = image ? "/" + image[0].filename : null;

        let inputData = {
          title: req.body.title,
          description: req.body.description,
          file: filePath,
          content: req.body.content,
          releaseDate: req.body.releaseDate,
        };

        Vegetasi.create(inputData)
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
      const idVegetasi = req.params.id;
      const upload = uploader("VEGETASI_PDF").fields([{ name: "image" }]);
      upload(req, res, (err) => {
        if (err) {
          console.log("gagal upload", err);
          return res.status(500).json({ msg: err });
        }

        const { image } = req.files;
        const filePath = image ? "/" + image[0].filename : null;

        let inputDataUpdate = {
          title: req.body.title,
          description: req.body.description,
          file: filePath,
          content: req.body.content,
          releaseDate: req.body.releaseDate,
        };

        Vegetasi.update(inputDataUpdate, {
          where: {
            id: idVegetasi,
          },
          returning: true,
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
    const idVegetasi = req.params.id;
    const vegetasi = await Vegetasi.findOne({ where: { id: idVegetasi } });
    try {
      if (!vegetasi) {
        return res.status(404).json({ message: "vegetasi data not found!" });
      } else {
        const deleteVegetasi = await Vegetasi.destroy({
          where: {
            id: idVegetasi,
          },
          returning: true,
          plain: true,
        });
        return res
          .status(200)
          .json({ msg: `sucess deleted vegetasi ${idVegetasi}` });
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

module.exports = VegetasiController;
