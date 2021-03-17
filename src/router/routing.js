const express = require('express')
const app = express()
const router = express.Router()

const pages = {
  home: require('./pages/homeRouter'),
  about: require('./pages/aboutRouter'),
  test: require('./pages/testRouter'),
  users: require('./pages/usersRouter')
}

router.get('/', pages.home)
router.get('/about', pages.about)
app.get('/test/redirect', pages.test.redirect)
router.get('/users', pages.users.user)
app.get('/users/get', pages.users.users_get)
app.get('/users/get/:id', pages.users.users_get_id)
router.route('/users/create')
  .get(pages.users.users_create)
  .post(pages.users.users_post)
router.get('/users/details/:id', pages.users.user_detail)

module.exports = {
  app,
  router
}