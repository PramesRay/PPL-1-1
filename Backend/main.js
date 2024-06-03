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

// Endpoint untuk menambahkan review
app.post('/post/review', async (req, res) => {
  const { deskripsi_review, rating, pengguna_id } = req.body;

  if (!deskripsi_review || !rating || !pengguna_id) {
    return res.status(400).send('Missing required fields');
  }

  // Menambahkan review ke database
  database.query('INSERT INTO review (deskripsi_review, rating, pengguna_id) VALUES (?, ?, ?)',
    [deskripsi_review, rating, pengguna_id], (err, results) => {
      if (err) {
        console.error('Database insert error:', err);
        return res.status(500).send('Failed to add review');
      }
      res.status(201).send({ review_id: results.insertId });
    });
});

// Endpoint untuk mendapatkan ulasan berdasarkan ID pengguna
app.get('/get/review/:pengguna_id', (req, res) => {
  const pengguna_id = req.params.pengguna_id;

  database.query('SELECT * FROM review WHERE pengguna_id = ?', [pengguna_id], (err, rows) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Failed to retrieve reviews');
    }
    res.status(200).send(rows);
  });
});


// Check-in route
app.post('/check-in', (req, res) => {
  const { pengguna_id } = req.body;
  if (!pengguna_id) {
    return res.status(400).send({ message: 'pengguna_id is required' });
  }

  const waktu_checkin = new Date().toISOString();
  const query = `INSERT INTO checkinout (waktu_checkin, pengguna_id) VALUES (?, ?)`;

  database.query(query, [waktu_checkin, pengguna_id], function (err) {
    if (err) {
      return res.status(500).send({ message: 'Failed to check in', error: err.message });
    }
    res.status(200).send({ message: 'Checked in successfully', check_in_out_id: this.lastID });
  });
});

// Check-out route
app.post('/check-out', (req, res) => {
  const { pengguna_id } = req.body;
  if (!pengguna_id) {
    return res.status(400).send({ message: 'pengguna_id is required' });
  }

  const waktu_checkout = new Date().toISOString();
  const query = `UPDATE checkinout SET waktu_checkout = ? WHERE pengguna_id = ? AND waktu_checkout IS NULL`;

  database.query(query, [waktu_checkout, pengguna_id], function (err) {
    if (err) {
      return res.status(500).send({ message: 'Failed to check out', error: err.message });
    }
    if (this.changes === 0) {
      return res.status(400).send({ message: 'No active check-in found for this user' });
    }
    res.status(200).send({ message: 'Checked out successfully' });
  });
});

// Get visitor count
app.get('/visitor-count', (req, res) => {
  const query = `SELECT COUNT(*) AS count FROM checkinout WHERE waktu_checkout IS NULL`;
  database.query(query, [], (err, rows) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send({ message: 'Failed to retrieve visitor count', error: err.message });
    }
    console.log('Query result:', rows);
    if (rows.length > 0) {
      res.status(200).send({ visitorCount: rows[0].count });
    } else {
      res.status(200).send({ visitorCount: 0 });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})