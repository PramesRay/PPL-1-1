const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
var session = require('express-session')
var bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const QRCode = require('qrcode')

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
  // res.status(200).json({message: "Berhasil masuk ke halaman utama"})
})

app.get('/login', (req, res) => {
  const loginStatus = req.session.loggedin
  
  if (loginStatus) {
    console.log("Anda telah login")
    return res.redirect('/')
  }

  res.render('login/login')
})

app.post('/login', async (req, res) => {
	// const username = req.body.usernameLogin
	// const password = req.body.passwordLogin
  const {username:username, password:password} = req.body
  const loginStatus = req.session.loggedin
  
  if (loginStatus) {
    console.log("Anda telah login")
    return res.redirect('/')
  }

  console.log('login attempt:', { username, password })

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
    req.session.role = user.role
    console.log('Login berhasil! kamu seorang ', req.session.role)
    return res.redirect('/')
  })
})

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/')
    }
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
      [email, username, hashedPassword, phone, role], (err, result) => {
        if (err) {
          console.error('Database insert error:', err)
          return res.status(500).send('Terjadi kesalahan pada server.')
        }

        req.session.loggedin = true
        req.session.username = username

        res.redirect('/login')
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
  const pengguna_id = req.session?.userId
  const { deskripsi_review, rating } = req.body;

  if (!pengguna_id) {
    return res.status(401).json({ error: "Akses tidak sah" });
}

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
  const userId = req.id //untuk keperluan testing sementara, nanti diganti dengan ```req.session.userId```
  const { nama, email, username, nomor_telepon, alamat, profile} = req.body;

  if (!userId) {
    return res.status(401).json({ error: "Akses tidak sah" });
  }

  if (userId) {
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

          database.query('UPDATE user SET nama = ?, email = ?, username = ?, nomor_telepon = ?, alamat = ? WHERE pengguna_id = ?', [ nama, email, username, nomor_telepon, alamat, userId ], (err, row) => {
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
  const pengguna_Id = req.session.pengguna_id; //untuk keperluan testing sementara, nanti diganti dengan ```req.session.userId```

  if (!pengguna_Id) {
    return res.status(401).json({ error: "Akses tidak sah" });
  }
  
  // Gunakan parameter pengguna_Id dalam query dengan cara yang aman
  database.query('SELECT nama, email, username, nomor_telepon, alamat, tanggal_bergabung FROM user WHERE pengguna_id = ?', [pengguna_Id], (err, rows) => {
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
app.post('/check-in/:pengguna_id', (req, res) => {
  const pengguna_id = req.pengguna_id; //untuk keperluan testing sementara, nanti diganti dengan ```req.session.userId```
  
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
app.post('/check-out/:pengguna_id', (req, res) => {
  const pengguna_id = req.pengguna_id; //untuk keperluan testing sementara, nanti diganti dengan ```req.session.userId```
  
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
app.get('/visitor-count/:pengguna_id', (req, res) => {
  const pengguna_id = req.pengguna_id; //untuk keperluan testing sementara, nanti diganti dengan ```req.session.userId```
  
  if (!pengguna_id) {
    return res.status(400).send({ message: 'pengguna_id is required' });
  }

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

// API endpoint to create a new transaction
app.post('/transactions', (req, res) => {
  const {metode_pembayaran, pengguna_id, level_id } = req.body;
  const tanggal_transaksi = new Date().toISOString();

  database.query("SELECT * from level where level_id = ?", [level_id], (err, result) => {
    if (err) throw err;
    const total_pembayaran = result[0].harga;

    // Check if all required fields are provided
    if (!tanggal_transaksi || !total_pembayaran || !metode_pembayaran || !pengguna_id || !level_id) {
      return res.status(400).json({ total_pembayaran : total_pembayaran, tanggal_transaksi : tanggal_transaksi});
    }

    // Prepare the SQL query
    const query = 'INSERT INTO transaction (tanggal_transaksi, total_pembayaran, metode_pembayaran, pengguna_id, level_id) VALUES (?, ?, ?, ?, ?)';
    const values = [tanggal_transaksi, total_pembayaran, metode_pembayaran, pengguna_id, level_id];

    // Execute the SQL query
    database.query(query, values, (err, results) => {
      if (err) throw err;
      res.status(201).json({ message: 'Transaction created successfully' });
    });
  }); 
});

app.get('/qrcode/:pengguna_id', (req, res) => {
  const pengguna_id = req.params.pengguna_id;
  console.log('Requested pengguna_id:', pengguna_id);

  // Lakukan query ke database untuk memeriksa keberadaan pengguna_id
  const query = 'SELECT * FROM user WHERE pengguna_id = ?';
  database.query(query, [pengguna_id], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Terjadi kesalahan di server');
    }

    console.log('Query result:', results);

    // Jika pengguna_id tidak ditemukan di database
    if (results.length === 0) {
      return res.status(404).send('Pengguna tidak ditemukan');
    }

    // Jika pengguna_id valid, hasilkan QR Code
    QRCode.toDataURL(`http://example.com/user/${pengguna_id}`, (err, url) => {
      if (err) {
        console.error('Failed to generate QR Code:', err);
        return res.status(500).send('Gagal menghasilkan QR Code');
      }

      // Kirim gambar QR Code sebagai respons
      res.send(`<img src="${url}">`);
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


// Endpoint untuk merubah password
app.put('/update/password/:pengguna_id', async (req, res) => {
  const pengguna_id = req.pengguna_id; //untuk keperluan testing sementara, nanti diganti dengan ```req.session.userId```
  const { passwordLama, passwordBaru, conPasswordBaru } = req.body;

  if (!pengguna_id) {
    return res.status(401).json({ error: "Akses tidak sah" });
  }

  database.query('SELECT password FROM user WHERE pengguna_id = ?', [pengguna_id], async (err, results) => {
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
    database.query('UPDATE user SET password = ? WHERE pengguna_id = ?', [hashedNewPassword, pengguna_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        res.status(200).json({ message: 'Password updated successfully' });
    });
  });
});