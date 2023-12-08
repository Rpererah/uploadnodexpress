const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

const PORT = 3001;
const UPLOADS_DIR = path.join(__dirname, 'uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

app.get('/api/photos', (req, res) => {
  const photos = [];
  fs.readdirSync(UPLOADS_DIR).forEach(file => {
    const photoUrl = `http://34.235.147.127:${PORT}/api/uploads/${file}`;
    photos.push(photoUrl);
  });
  res.json(photos);
});

app.post('/api/upload', upload.single('imagem'), (req, res) => {
  res.send('Upload realizado com sucesso!');
});

app.use('/api/uploads', express.static(UPLOADS_DIR));


app.get('/teste', (req, res) => {
  res.send('servidor funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
