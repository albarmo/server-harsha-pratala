const { Anggota } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateAccessToken } = require("../helpers/jwt");

class UserController {
  // get all user data
  static async getAllUser(req, res) {
    let data = await Anggota.findAll();
    try {
      if (data) {
        return res.status(200).json({ data });
      } else {
        return res.status(500).json({ message: "user table empty" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async register(req, res) {
    let inputDataRegister = {
      firsname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      no_anggota: req.body.no_anggota,
      password: req.body.password,
      type: req.body.type,
    };
    Anggota.create(inputDataRegister, {})
      .then((data) => {
        return res.status(201).json({ data });
      })
      .catch((error) => {
        return res.status(400).json({ message: error.message });
      });
  }

  static async login(req, res) {
    const inputLogin = {
      email: req.body.email,
      password: req.body.password,
    };
    const user = await Anggota.findOne({
      where: { email: inputLogin.email },
    });

    try {
      if (!user) {
        return res
          .status(400)
          .json({ message: "failed, user not registered..." });
      } else if (!comparePassword(inputLogin.password, user.password)) {
        return res.status(401).json({ msg: "email or password wrong!" });
      } else {
        const accessToken = generateAccessToken({
          email: user.email,
          password: user.password,
          no_anggota: user.no_anggota,
        });
        return res.status(200).json({ accessToken, ...user });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async updateUser(req, res) {
    //
    const idUser = req.params.id;
    const inputDataUpdate = {
      firsname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      no_anggota: req.body.no_anggota,
      password: req.body.password,
      type: req.body.type,
    };

    try {
      const userDataById = await Anggota.findOne({
        where: {
          id: idUser,
        },
        returning: true,
        plain: true,
      });

      if (userDataById) {
        const updateUser = await Anggota.update(inputDataUpdate, {
          where: {
            id: idUser,
          },
        });
        if (updateUser) {
          return res.status(200).json({ data: updateUser });
        }
      } else if (!userDataById) {
        res.status(404).json({ msg: "user not found!" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteUser(req, res) {
    const idUser = req.params.id;
    try {
      const deleteUser = await Anggota.destroy({ where: { id: idUser } });
      if (deleteUser) {
        return res
          .status(200)
          .json({ message: `success delete user with id ${idUser}` });
      } else {
        return res
          .status(404)
          .json({ message: `failed, delete user with id ${idUser} not found` });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserController;
