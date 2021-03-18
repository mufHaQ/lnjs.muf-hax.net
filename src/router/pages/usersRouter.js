const uuid = require('uuid').v4
const mongoose = require('mongoose')
const User = require('../../models/usersModel')

const db_url = process.env.DB_URL
const dbase = process.env.DB
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASS

// Database
mongoose.connect(`mongodb://${db_user}:${db_pass}@${db_url}/${dbase}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to database')
});

// const users = []

module.exports = {
  user: (req, res) => {
    let search = {}

    if (req.query.s) {
      search = {
        username: {
          $regex: req.query.s,
          $options: 'i'
        }
      }
    }

    // Cara pertama
    User.find(search, (err, data) => {
      if (err) console.log(err)
      res.render('users/usersViews', {
        title: 'Users',
        users: data,
        tab: 'users'
      })
    })

    // Cara kedua
    // const query = User.find(search)
    // query.sort({
    //   date: -1
    // })
    // query.exec((err, data) => {
    //   if (err) console.log(err)

    //   res.render('users/usersViews', {
    //     title: 'Users',
    //     users: data,
    //     tab: 'users'
    //   })
    // })
  },
  users_get: (req, res) => {
    User.find((err, data) => {
      res.send({
        data: data
      })
    })
  },
  users_get_id: (req, res) => {
    const id = req.params.id
    User.findById(id, (err, data) => {
      if (err) {
        res.json({
          status: 'Error'
        })
      } else {
        res.json({
          data: data
        })
      }
    })
  },
  users_create: (req, res) => {
    res.render('users/createViews', {
      title: 'Create User',
      tab: 'create'
    })
  },
  users_post: (req, res) => {
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    })
    user.save((err, data) => {
      if (err) res.send('false')
      res.send('true')
    })
  },
  user_detail: (req, res) => {
    const id = req.params.id
    User.findById(id, (err, data) => {
      res.render('users/detailViews', {
        user: data,
        title: `Details - ${data.username}`,
        tab: 'user'
      })
    })
  },
  user_update: (req, res) => {
    const id = req.body.id
    User.findByIdAndUpdate(id, {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }, {
      new: true
    }, (err, data) => {
      res.send(data)
    })
  },
  user_update_get: (req, res) => {
    const id = req.params.id
    User.findById(id, (err, data) => {
      res.render('users/updateViews', {
        title: "Update - " + data.username,
        data: data,
        tab: 'update'
      })
    })
  },
  user_delete: (req, res) => {
    const id = req.body.id
    User.findByIdAndDelete(id, (err, data) => {
      if (err) res.send('false')
      res.send('true')
    })
  },
  test_update: (req, res) => {
    const id = req.body.id
    User.findByIdAndUpdate(id, {
      username: 'kay'
    }, {
      new: true
    }, (err, data) => {
      res.send(data)
    })
  }
}