const uuid = require('uuid').v4

const users = []

module.exports = {
  user: (req, res) => {
    res.render('users/usersViews', {
      title: 'Users',
      users: users,
      tab: 'users'
    })
    // res.json(users.username)
  },
  users_get: (req, res) => {
    res.json({
      status: true,
      method: req.method,
      url: req.url,
      data: users,
      message: `show users data with ${req.method} method`
    })
  },
  users_create: (req, res) => {
    res.render('users/createViews', {
      title: 'Create User',
      tab: 'create'
    })
    res.json(req.body)
  },
  users_post: (req, res) => {
    users.push({
      id: uuid(),
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    })
    // users.push(req.body)
    res.redirect('/users/create')
  },
  users_get_id: (req, res) => {
    const id = req.params.id
    const user = users.find(usr => usr.id == id)
    res.json({
      user: user
    })
  },
  user_detail: (req, res) => {
    const id = req.params.id
    const user = users.find(usr => usr.id == id)
    res.render('users/detailViews', {
      user: user,
      title: 'Details User',
      tab: 'user'
    })
    // res.json(user)
  }
}