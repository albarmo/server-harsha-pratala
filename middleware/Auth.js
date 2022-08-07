const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

function authentification(req, res, next) {
  const { access_token } = req.headers
  if (access_token) {
    let decode = verifyToken(access_token)
    req.userData = decode
    next()
  } else {
    next({ name: 'Unauthenticated' })
  }
}

function authorization(req, res, next) {
  console.log({ userdata: req.userData })
  User.findByPk(req.userData.id)
    .then((user) => {
      console.log({ user })
      if (user.is_admin) {
        next()
      } else {
        next({ name: 'Not Authorized' })
      }
    })
    .catch((err) => {
      next(err)
    })
}
module.exports = { authentification, authorization }
