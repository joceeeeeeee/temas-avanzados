const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit'); // Importar PDFKit
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const jsonData = JSON.parse(fs.readFileSync('usuarios.json'));
const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('usuarios.pdf'));
doc.fontSize(12).text(JSON.stringify(jsonData,null,2));
doc.end();

console.log('JSON CREADO');

// ✅ Servir la carpeta donde está el PDF (ajusta la ruta si es necesario)
app.use('/pdfs', express.static(path.join(__dirname))); // <-- si usuarios.pdf está en la raíz de backend

// Ruta para generar el PDF
app.get('/api/generar-pdf', (req, res) => {
  const jsonData = JSON.parse(fs.readFileSync('usuarios.json'));

  const doc = new PDFDocument();
  const pdfPath = path.join(__dirname, 'usuarios.pdf');
  const stream = fs.createWriteStream(pdfPath);
  doc.pipe(stream);
  doc.fontSize(12).text(JSON.stringify(jsonData, null, 2));
  doc.end();

  stream.on('finish', () => {
    res.json({ mensaje: 'PDF generado con éxito' });
  });
});



// Ruta GET para obtener todos los usuarios registrados
app.get('/api/usuarios', (req, res) => {
  const filePath = path.join(__dirname, 'usuarios.json');

  if (!fs.existsSync(filePath)) {
    return res.status(200).json([]); // Devuelve arreglo vacío si no existe el archivo
  }

  const data = fs.readFileSync(filePath);
  const usuarios = JSON.parse(data);
  res.status(200).json(usuarios);
});

// ✅ Servir archivos estáticos desde "frontend"
app.use(express.static(path.join(__dirname, '../frontend')));

// Ruta POST para guardar datos del formulario
app.post('/api/registro', (req, res) => {
  const { nombre, mesa } = req.body;

  if (!nombre || !mesa) {
    return res.status(400).json({ mensaje: 'Faltan datos: nombre o mesa' });
  }

  const filePath = path.join(__dirname, 'usuarios.json');

  let usuarios = [];
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    usuarios = JSON.parse(data);
  }

  usuarios.push({ nombre, mesa });

  fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));

  res.status(200).json({ mensaje: 'Usuario registrado correctamente' });
});



// ✅ Ruta raíz para servir index.html del frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
