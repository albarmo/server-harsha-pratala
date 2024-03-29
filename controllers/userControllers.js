const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateAccessToken } = require('../helpers/jwt')
const sequelize = require('sequelize')

class UserController {
  static async getAllUser(req, res) {
    const { is_admin, member_id, first_name, last_name } = req.query
    const params = {}
    if (is_admin) {
      params['is_admin'] = is_admin
    }
    if (member_id) {
      params['member_id'] = member_id
    }
    if (first_name) {
      params['first_name'] = sequelize.where(
        sequelize.fn('LOWER', sequelize.col('first_name')),
        'LIKE',
        '%' + first_name.toLowerCase() + '%',
      )
    }
    if (last_name) {
      params['last_name'] = sequelize.where(
        sequelize.fn('LOWER', sequelize.col('last_name')),
        'LIKE',
        '%' + last_name.toLowerCase() + '%',
      )
    }
    try {
      const data = await User.findAll({
        where: { ...params },
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
      const data = await User.findOne({
        where: { id: idArticle },
      })
      if (data) {
        return res.status(200).json({ data })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async register(req, res) {
    let inputDataRegister = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      birth_date: req.body.birth_date,
      member_id: req.body.member_id,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      is_admin: req.body.is_admin,
      profile_picture: req.body.profile_picture,
      password: req.body.password,
    }
    User.create(inputDataRegister, {})
      .then((data) => {
        return res.status(201).json({ data })
      })
      .catch((error) => {
        return res.status(400).json({ message: error.message })
      })
  }

  static async login(req, res) {
    const inputLogin = {
      email: req.body.email,
      password: req.body.password,
    }
    const user = await User.findOne({
      where: { email: inputLogin.email },
    })

    try {
      if (!user) {
        return res.status(400).json({ message: 'failed, user not member...' })
      } else if (
        !comparePassword(inputLogin.password, user.dataValues.password)
      ) {
        return res.status(401).json({ msg: 'email or password wrong!' })
      } else {
        const access_token = generateAccessToken({
          id: user.id,
          email: user.email,
          password: user.password,
          no_anggota: user.member_id,
        })
        return res.status(200).json({ access_token })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async loginWithMemberId(req, res) {
    const inputLogin = {
      member_id: req.body.member_id,
      password: req.body.password,
    }
    const user = await User.findOne({
      where: { member_id: inputLogin.member_id },
    })

    try {
      if (!user) {
        return res.status(400).json({ message: 'failed, user not member...' })
      } else if (
        !comparePassword(inputLogin.password, user.dataValues.password)
      ) {
        return res.status(401).json({ msg: 'email or password wrong!' })
      } else {
        const access_token = generateAccessToken({
          id: user.id,
          email: user.email,
          password: user.password,
          no_anggota: user.member_id,
        })
        return res.status(200).json({ access_token })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async updateUser(req, res) {
    const idUser = req.params.id
    const inputDataUpdate = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      birth_date: req.body.birth_date,
      member_id: req.body.member_id,
      phone: req.body.phone,
      address: req.body.address,
      is_admin: req.body.is_admin,
      profile_picture: req.body.profile_picture,
    }
    try {
      const userDataById = await User.findOne({
        where: {
          id: idUser,
        },
        returning: true,
        plain: true,
      })

      if (userDataById) {
        const updateUser = await User.update(inputDataUpdate, {
          where: {
            id: idUser,
          },
          returning: true,
        })
        if (updateUser) {
          return res.status(200).json({ updateUser })
        }
      } else if (!userDataById) {
        res.status(404).json({ msg: 'user not found!' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message, error })
    }
  }

  static async deleteUser(req, res) {
    const idUser = req.params.id
    try {
      const deleteUser = await User.destroy({
        where: { id: idUser },
        returning: true,
      })
      if (deleteUser) {
        return res
          .status(200)
          .json({ message: `success delete user with id ${idUser}` })
      } else {
        return res
          .status(404)
          .json({ message: `failed, delete user with id ${idUser} not found` })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

module.exports = UserController
