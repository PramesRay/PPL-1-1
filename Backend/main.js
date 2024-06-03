const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
var session = require('express-session')
var bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_fitivities",
})

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(express.json())

database.connect((err) => {
  if (err) throw err
  console.log("Database Connected")
})

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login', (req, res) => {
  res.render('login/login')
})

app.post('/login', async (req, res) => {
	const username = req.body.usernameLogin
	const password = req.body.passwordLogin

  console.log('login attempt:', { username, password})

  // Check if user exists
  database.query('SELECT * FROM user WHERE username = ?', [username], async (err, result) => {
    if (err) {
      console.error('Database query error:', err)
      return res.status(500).send('Terjadi kesalahan pada server.')
    }

    if (result.length === 0) {
      return res.status(400).send('username tidak ditemukan.')
    }

    const user = result[0]
    console.log('User found:', user)

    // Compare hashed password
    const match = await bcrypt.compare(password, user.password)
    console.log('Password match:', match)
    
    if (!match) {
      return res.status(400).send('Password salah.')
    }

    // Set session and login user
    req.session.loggedin = true
    req.session.username = user.username
    res.redirect('/')
    console.log('Login berhasil!')
  })
})

app.post('/register', async (req, res) => {
  const { usernameReg: username, passwordReg: password, conPasswordReg: conPassword, emailReg: email, phoneReg: phone } = req.body
  const role = 'user'

  try {
    // Check if email already exists
    database.query('SELECT * FROM user WHERE email = ?', [email], async (err, result) => {
      if (err) {
        console.error('Database query error:', err)
        return res.status(500).send('Terjadi kesalahan pada server.')
      }

      if (result.length > 0) {
        return res.status(400).send('Email sudah terdaftar.')
      }

      // Check if password and confirm password match
      if (password !== conPassword) {
        return res.status(400).send('Password dan konfirmasi password tidak cocok.')
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Insert the new user into the database
      database.query('INSERT INTO `user` (`email`, `username`, `password`, `nomor_telepon`, `role`) VALUES (?, ?, ?, ?, ?)', 
      [email, username, hashedPassword, phone, role], (err, results) => {
        if (err) {
          console.error('Database insert error:', err)
          return res.status(500).send('Terjadi kesalahan pada server.')
        }

        req.session.loggedin = true
        req.session.username = username
        res.redirect('/')
        console.log('Registrasi berhasil dan data berhasil ditambah!')
      })
    })
  } catch (error) {
    console.error('Error during registration process:', error)
    res.status(500).send('Terjadi kesalahan pada server.')
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})