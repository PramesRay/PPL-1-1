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
  password: "root",
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
    req.session.userId = user.pengguna_id
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
      [email, username, hashedPassword, phone, role], (err, res) => {
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
        return results.status(500).send('Failed to add review');
      }
      results.status(201).send({ review_id: results.insertId });
    });
});

// Endpoint untuk mendapatkan semua ulasan yang diurutkan berdasarkan review_id secara terbaru
app.get('/get/review', (req, res) => {
  database.query('SELECT * FROM review ORDER BY review_id DESC', (err, rows) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Failed to retrieve review');
    }
    res.status(200).send(rows);
  });
});

app.put('/update/profile/:id', (req, res) => {
  const userID = req.params.id //untuk keperluan testing sementara
  const userId = req.session.userId;
  const { nama, email, username, nomor_telepon, alamat, profile} = req.body;

  if (userID) {
    // Check if email already exists
    database.query('SELECT * FROM user WHERE email = ?', [email], async (err, res1) => {
      if (err) {
        console.error('Database query error:', err)
        return res.status(500).send('Terjadi kesalahan pada server.')
      }

      if (res1.length > 0) {
        return res.status(400).send('Email sudah terdaftar.')
      }

      // Check if number already exists
      database.query('SELECT * FROM user WHERE nomor_telepon = ?', [nomor_telepon], async (err, res2) => {
        if (err) {
          console.error('Database query error:', err)
          return res.status(500).send('Terjadi kesalahan pada server.')
        }

        if (res2.length > 0) {
          return res.status(400).send('Nomor Handphone sudah terdaftar.')
        }

        // Check if username already exists
        database.query('SELECT * FROM user WHERE username = ?', [username], async (err, res3) => {
          if (err) {
            console.error('Database query error:', err)
            return res.status(500).send('Terjadi kesalahan pada server.')
          }

          if (res3.length > 0) {
            return res.status(400).send('username sudah terdaftar.')
          }

          database.query('UPDATE user SET nama = ?, email = ?, username = ?, nomor_telepon = ?, alamat = ? WHERE pengguna_id = ?', [ nama, email, username, nomor_telepon, alamat, userID ], (err, row) => {
            if (err) {
              console.error('Database query error:', err);
              return res.status(500).send('Failed to retrieve data account');
            }
            
            res.status(200).json({ message: 'Profile updated successfully'});
          });
        })
      })
    })
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Endpoint untuk mendapatkan data pengguna di pengaturan akun
app.get('/get/user/:pengguna_id', (req, res) => {
  const penggunaId = req.params.pengguna_id;
  
  // Gunakan parameter penggunaId dalam query dengan cara yang aman
  database.query('SELECT nama, email, username, nomor_telepon, alamat, tanggal_bergabung FROM user WHERE pengguna_id = ?', [penggunaId], (err, rows) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Failed to retrieve data account');
    }
    
    // Periksa apakah ada data yang ditemukan
    if (rows.length === 0) {
      return res.status(404).send('User not found');
    }
    
    res.status(200).send(rows[0]);
  })
})
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
  console.log(`Example app listening on port ${port}`);
});


// Endpoint untuk merubah password
app.put('/update/password/:id', async (req, res) => {
  const penggunaID = req.params.id; //untuk keperluan testing
  const penggunaId = req.session.userId 
  const { passwordLama, passwordBaru, conPasswordBaru } = req.body;

  database.query('SELECT password FROM user WHERE pengguna_id = ?', [penggunaID], async (err, results) => {
    if (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];

    // Periksa apakah password lama cocok
    const isMatch = await bcrypt.compare(passwordLama, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Old password is incorrect' });
    }

    // Check if password and confirm password match
    if (passwordBaru !== conPasswordBaru) {
      return res.status(400).send('Password dan konfirmasi password tidak cocok.')
    }

    // Hash password baru
    const hashedNewPassword = await bcrypt.hash(passwordBaru, 10);

    // Update password di database
    database.query('UPDATE user SET password = ? WHERE pengguna_id = ?', [hashedNewPassword, penggunaID], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        res.status(200).json({ message: 'Password updated successfully' });
    });
  });
});