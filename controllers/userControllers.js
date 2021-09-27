const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateAccessToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");

class UserController {
  // get all user data
  static async getAllUser(req, res) {
    let data = await User.findAll();
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
      firsName: req.body.firsName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      clubId: req.body.clubId,
      role: req.body.role,
      password: req.body.password,
    };
    User.create(inputDataRegister, {})
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

    const user = await User.findOne({
      where: { email: inputLogin.email },
    });

    const userId = user?.dataValues?.id;

    console.log(inputLogin, "ini input login");
    console.log(user.dataValues.password, "ini user");

    try {
      if (!user) {
        return res
          .status(400)
          .json({ message: "failed, user not registered..." });
      } else if (
        !comparePassword(inputLogin.password, user.dataValues.password)
      ) {
        return res.status(401).json({ msg: "email or password wrong!" });
      } else {
        const accessToken = generateAccessToken({
          email: user.email,
          password: user.password,
          no_anggota: user.no_anggota,
        });
        return res.status(200).json({ accessToken, userId });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async updateUser(req, res) {
    const idUser = req.params.id;
    const inputDataUpdate = {
      firsName: req.body.firsName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      clubId: req.body.clubId,
      role: req.body.role,
      password: hashPassword(req.body.password),
    };

    try {
      const userDataById = await User.findOne({
        where: {
          id: idUser,
        },
        returning: true,
        plain: true,
      });

      if (userDataById) {
        const updateUser = await User.update(inputDataUpdate, {
          where: {
            id: idUser,
          },
          returning: true,
        });
        if (updateUser) {
          return res.status(200).json({ updateUser });
        }
      } else if (!userDataById) {
        res.status(404).json({ msg: "user not found!" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message, error });
    }
  }

  static async deleteUser(req, res) {
    const idUser = req.params.id;
    try {
      const deleteUser = await User.destroy({
        where: { id: idUser },
        returning: true,
      });
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
