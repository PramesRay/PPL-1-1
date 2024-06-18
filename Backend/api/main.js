const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
var session = require('express-session')
var bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const QRCode = require('qrcode')
const midtransClient = require('midtrans-client')

const database = mysql.createConnection({
  host: "bkrzoo3jm5xsorunse88-mysql.services.clever-cloud.com",
  user: "u0q6rsyf8qzqp0pt",
  password: "qoSjZvRHIMlZy0V2KfCX",
  database: "bkrzoo3jm5xsorunse88",
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
  res.render('payment')
  // res.status(200).json({message: "Berhasil masuk ke halaman utama"})
})

app.get('/login', (req, res) => {
  const loginStatus = req.session.loggedin
  
  if (loginStatus) {
    console.log("Anda telah login")
    return res.redirect('/')
  }
  console.log("Memasuki halaman login")
  res.render('login/login')
})

app.post('/login', async (req, res) => {
	const username = req.body.usernameLogin
	const password = req.body.passwordLogin
  // const {username, password} = req.body
  const loginStatus = req.session.loggedin
  
  if (loginStatus) {
    console.log("Anda telah login")
    return res.redirect('/')
  }

  console.log('login attempt:', { username, password }) //testing aja

  // Check if user exists
  database.query('SELECT * FROM user WHERE username = ?', [username], async (err, result) => {
    if (err) {
      console.error('Database query error:', err)
      return res.status(500).json({ message:'Terjadi kesalahan pada server' })
    }

    if (result.length === 0) {
      return res.status(400).json({ message:'Username tidak ditemukan' })
    }

    const user = result[0]
    console.log('User found:', user)

    // Compare hashed password
    const match = await bcrypt.compare(password, user.password)
    console.log('Password match:', match)
    
    if (!match) {
      return res.status(400).json({ message:'Password salah' })
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
    database.query('SELECT * FROM user WHERE email = ?', [email], async (err, res1) => {
      if (err) {
        console.error('Database query error:', err)
        return res.status(500).json({ message:'Terjadi kesalahan pada server' })
      }
      
      if (res1.length > 0) {
        return res.status(400).json({ message:'Email sudah terdaftar' })
      }
      
      // Check if phone number already exists
      database.query('SELECT * FROM user WHERE nomor_telepon = ?', [phone], async (err, res2) => {
        if (err) {
          console.error('Database query error:', err)
          return res.status(500).json({ message:'Terjadi kesalahan pada server' })
        }
        
        if (res2.length > 0) {
          return res.status(400).json({ message:'Nomor Handphone sudah terdaftar' })
        }
      })

      // Check if password and confirm password match
      if (password !== conPassword) {
        return res.status(400).json({ message:'Password dan konfirmasi password tidak cocok' })
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Insert the new user into the database
      database.query('INSERT INTO `user` (`email`, `username`, `password`, `nomor_telepon`, `role`) VALUES (?, ?, ?, ?, ?)', 
      [email, username, hashedPassword, phone, role], (err, res3) => {
        if (err) {
          console.error('Database insert error:', err)
          return res.status(500).json({ message:'Terjadi kesalahan pada server' })
        }
        
        database.query('SELECT role FROM user WHERE pengguna_id = ?', [res3.insertId], (err, res4) => {
          req.session.loggedin = true
          req.session.username = username
          req.session.userId = res3.insertId
          req.session.role = res4[0].role
        })
        res.redirect('/')
        console.log('Registrasi berhasil dan data berhasil ditambah!')
      })

    })
  } catch (error) {
    console.error('Error during registration process:', error)
    res.status(500).json({ message:'Terjadi kesalahan pada server' })
  }
})

// Endpoint untuk menambahkan review
app.post('/post/review', async (req, res) => {
  const pengguna_id = req.session?.userId
  const { deskripsi_review, rating } = req.body;

  if (!pengguna_id) {
    return res.status(401).json({ message: "Login dulu dong!" });
  }

  if (!deskripsi_review || !rating || !pengguna_id) {
    return res.status(400).json({ message:'Missing required fields' })
  }

  // Menambahkan review ke database
  database.query('INSERT INTO review (deskripsi_review, rating, pengguna_id) VALUES (?, ?, ?)',
    [deskripsi_review, rating, pengguna_id], (err, results) => {
      if (err) {
        console.error('Database insert error:', err);
        return res.status(500).json({ message:'Failed to add review' })
      }
      return res.status(201).json({ review_id: results.insertId, message: 'Review berhasil ditambahkan' });
    });
});

// Endpoint untuk mendapatkan semua ulasan yang diurutkan berdasarkan review_id secara terbaru
app.get('/get/review', (req, res) => {
  database.query('SELECT * FROM review ORDER BY review_id DESC', (err, rows) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message:'Failed to retrieve review' })
    }
    res.status(200).json(rows);
  });
});

app.put('/update/profile/:id', (req, res) => {
  const userId = req.id //untuk keperluan testing sementara, nanti diganti dengan ```req.session.userId```
  const { nama, email, username, nomor_telepon, alamat, profile} = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Login dulu dong!" });
  }

  if (userId) {
    // Check if email already exists
    database.query('SELECT * FROM user WHERE email = ?', [email], async (err, res1) => {
      if (err) {
        console.error('Database query error:', err)
        return res.status(500).json({ message:'Terjadi kesalahan pada server' })
      }

      if (res1.length > 0 && res1[0].pengguna_id != userId) {
        return res.status(400).json({ message:'Email sudah terdaftar' })
      }

      // Check if number already exists
      database.query('SELECT * FROM user WHERE nomor_telepon = ?', [nomor_telepon], async (err, res2) => {
        if (err) {
          console.error('Database query error:', err)
          return res.status(500).json({ message:'Terjadi kesalahan pada server' })
        }

        if (res2.length > 0 && res2[0].pengguna_id != userId) {
          return res.status(400).json({ message:'Nomor Handphone sudah terdaftar' })
        }

        // Check if username already exists
        database.query('SELECT * FROM user WHERE username = ?', [username], async (err, res3) => {
          if (err) {
            console.error('Database query error:', err)
            return res.status(500).json({ message:'Terjadi kesalahan pada server' })
          }

          if (res3.length > 0 && res3[0].pengguna_id != userId) {
            return res.status(400).json({ message:'username sudah terdaftar' })
          }

          // Mengambil data profile yang lama
          database.query('SELECT * FROM user WHERE pengguna_id = ?', [userId], async (err, res4) => {
            if (err) {
              console.error('Database query error:', err)
              return res.status(500).json({ message:'Terjadi kesalahan pada server' })
            }

            const user = res4[0];
            const oldProfilePic = user.foto_profile
            
            database.query('UPDATE user SET nama = ?, email = ?, username = ?, nomor_telepon = ?, alamat = ?, foto_profile = ? WHERE pengguna_id = ?', [ nama, email, username, nomor_telepon, alamat, profile, userId ], (err, row) => {
              if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ message:'Failed to retrieve data account' })
                }
                
                // Delete the old profile picture from the storage
                if (oldProfilePic) {
                  const oldProfilePicPath = path.join(__dirname, 'public/images', oldProfilePic.toString());
                  fs.unlink(oldProfilePicPath, (err) => {
                    if (err) {
                      console.error('Error deleting old profile picture:', err);
                    } else {
                      console.log('Old profile picture deleted successfully.');
                    }
                  });
                }

              res.status(200).json({ message: 'Profile updated successfully', data: row });
            })
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
    return res.status(401).json({ message: "Login dulu dong!" });
  }
  
  // Gunakan parameter pengguna_Id dalam query dengan cara yang aman
  database.query('SELECT nama, email, username, nomor_telepon, alamat, tanggal_bergabung, foto_profile FROM user WHERE pengguna_id = ?', [pengguna_Id], (err, rows) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message:'Failed to retrieve data account' })
    }
    
    // Periksa apakah ada data yang ditemukan
    if (rows.length === 0) {
      return res.status(404).json({ message:'User not found' })
    }

    const user = rows[0];
    user.foto_profile_url = `/public/images/${user.foto_profile}`;
    
    res.status(200).json(user);
  })
})

// Check-in route
app.post('/check-in/:pengguna_id', (req, res) => {
  const pengguna_id = req.pengguna_id; //untuk keperluan testing sementara, nanti diganti dengan ```req.session.userId```
  
  if (!pengguna_id) {
    return res.status(400).json({ message: "Login dulu dong!" });
  }

  const waktu_checkin = new Date().toISOString();
  const query = `INSERT INTO checkinout (waktu_checkin, pengguna_id) VALUES (?, ?)`;

  database.query(query, [waktu_checkin, pengguna_id], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Failed to check in', error: err.message });
    }
    res.status(200).json({ message: 'Checked in successfully', check_in_out_id: this.lastID, check_in_status: true });
  });
});

// Check-out route
app.post('/check-out/:pengguna_id', (req, res) => {
  const pengguna_id = req.pengguna_id; //untuk keperluan testing sementara, nanti diganti dengan ```req.session.userId```
  
  if (!pengguna_id) {
    return res.status(400).json({ message: "Login dulu dong!" });
  }

  const waktu_checkout = new Date().toISOString();
  const query = `UPDATE checkinout SET waktu_checkout = ? WHERE pengguna_id = ? AND waktu_checkout IS NULL`;

  database.query(query, [waktu_checkout, pengguna_id], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Failed to check out', error: err.message });
    }
    if (this.changes === 0) {
      return res.status(400).json({ message: 'No active check-in found for this user' });
    }
    res.status(200).json({ message: 'Checked out successfully', check_in_status: false });
  });
});

// Get visitor count
app.get('/visitor-count/:pengguna_id', (req, res) => {
  const pengguna_id = req.pengguna_id; //untuk keperluan testing sementara, nanti diganti dengan ```req.session.userId```
  
  if (!pengguna_id) {
    return res.status(400).json({ message: "Login dulu dong!" });
  }

  const query = `SELECT COUNT(*) AS count FROM checkinout WHERE waktu_checkout IS NULL`;
  database.query(query, [], (err, rows) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Failed to retrieve visitor count', error: err.message });
    }
    console.log('Query result:', rows);
    if (rows.length > 0) {
      res.status(200).json({ visitorCount: rows[0].count });
    } else {
      res.status(200).json({ visitorCount: 0 });
    }
  });
});

// API endpoint to create a new transaction
app.post('/transactions', (req, res) => {
  //const userId = req.session.userId
  const {metode_pembayaran, pengguna_id, level_id } = req.body;
  const tanggal_transaksi = moment().format('YYYY-MM-DD HH:mm:ss');
  const status_pembayaran = "pending"

  database.query("SELECT * from level where level_id = ?", [level_id], (err, result) => {
    if (err) throw err;
    const total_pembayaran = result[0].harga;

    // Check if all required fields are provided
    if (!tanggal_transaksi || !total_pembayaran || !metode_pembayaran || !pengguna_id || !level_id) {
      return res.status(400).json({ total_pembayaran : total_pembayaran, tanggal_transaksi : tanggal_transaksi});
    }

    // Prepare the SQL query
    const query = 'INSERT INTO transaction (tanggal_transaksi, total_pembayaran, metode_pembayaran, pengguna_id, level_id, status_pembayaran) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [tanggal_transaksi, total_pembayaran, metode_pembayaran, pengguna_id, level_id, status_pembayaran];

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

// Endpoint untuk merubah password
app.put('/update/password/:pengguna_id', async (req, res) => {
  const pengguna_id = req.pengguna_id; //untuk keperluan testing sementara, nanti diganti dengan ```req.session.userId```
  const { passwordLama, passwordBaru, conPasswordBaru } = req.body;

  if (!pengguna_id) {
    return res.status(401).json({ message: "Login dulu dong!" });
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
      return res.status(400).json({ message:'Password dan konfirmasi password tidak cocok' })
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


// Create Snap API instance
let snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction : false,
  serverKey : 'SB-Mid-server-R7IFInBtUj5BY4DIJAgjT35_'
});

app.get('/get-transaction-token/:id', async (req, res) => {
  const pengguna_id = req.session.userId; // Make sure user is logged in
  const transaksi_id = req.params.id; 
  
  if (!pengguna_id) {
    return res.status(401).json({ message: "Login dulu dong!" });
  }
  
  try {
      database.query("SELECT * FROM transaction WHERE transaksi_id = ? AND pengguna_id = ?", [transaksi_id, pengguna_id], async (err, result) => {
        if (err) {
          console.log(err)
          return res.status(500).json({ message:'Terjadi kesalahan pada server'})
        } 
        
        if (result.length === 0) {
          console.log(transaksi_id)
        }
        
        const transaction = result[0];
        if (transaction.status_pembayaran != "pending") {
            // If a transaction exists, return the existing token
            res.json({ message: transaction });
        }else{
            const parameter = {
                "transaction_details": {
                    "order_id": transaction.transaksi_id.toString(), // Ensure order_id is a string
                    "gross_amount": transaction.total_pembayaran
                }
            };
  
            const transactionTokenResponse = await snap.createTransaction(parameter);
            if (transactionTokenResponse.token) {
                return res.status(200).json({ message: "Pengambilan Token Berhasil", 
                                              token: transactionTokenResponse.token, 
                                              redirect_url: transactionTokenResponse.redirect_url})
            } else {
                res.status(500).json({ message: 'Gagal mendapatkan token' });
            }
        }
      })
      
      
  } catch (error) {
      console.error('Error generating transaction token:', error);
      res.status(500).json({ error: 'Internal server error.' });
  }
});

app.put('/transaction-done/:id', (req, res) => {
  const pengguna_id = req.session.userId
  const transaksi_id = req.params.id

  if (!pengguna_id) {
    return res.status(401).json({ message: "Login dulu dong!" });
  }

  database.query(`UPDATE transaction SET status_pembayaran = "berhasil" WHERE transaksi_id = ?`, [transaksi_id], (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ message:'Terjadi kesalahan pada server database'})
    }
    database.query('UPDATE user SET role = "member" WHERE pengguna_id =?', [pengguna_id], (err, result2) => {
      if (err){
        console.log(err)
        return res.status(500).json({message: 'Terjadi kesalahan pada server database'})  
      }
      return res.status(200).json({ message:'Subscribe berhasil! Selamat anda sekarang adalah seorang member'})
    })
  })
})

app.listen(port, () => {
  console.log(`Fitivities listening on port ${port}`);
});