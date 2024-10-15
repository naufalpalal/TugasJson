const express = require('express');
const bodyParser = require('body-parser');
const xml2js = require('xml2js');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Daftar buku sebagai contoh data
let books = [
    {
        id: 1,
        title: "Buku A",
        author: "Penulis A"
    },
    {
        id: 2,
        title: "Buku B",
        author: "Penulis B"
    },
    {
        id: 3,
        title: "Buku C",
        author: "Penulis B"
    }
];

// Endpoint GET untuk API JSON
app.get('/api/books/json', (req, res) => {
    res.json(books);
});

// Endpoint GET untuk API XML
app.get('/api/books/xml', (req, res) => {
    const builder = new xml2js.Builder();
    const xml = builder.buildObject({ books: { book: books } });
    res.set('Content-Type', 'application/xml');
    res.send(xml);
});

// Endpoint POST untuk menambahkan buku dalam format JSON
app.post('/api/books/json', (req, res) => {
    const newBook = req.body;
    newBook.id = books.length + 1; // Menentukan ID baru
    books.push(newBook);
    res.status(201).json(newBook);
});

// Endpoint POST untuk menambahkan buku dalam format XML
app.post('/api/books/xml', (req, res) => {
    const newBook = req.body;
    newBook.id = books.length + 1; // Menentukan ID baru
    books.push(newBook);
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(newBook);
    res.set('Content-Type', 'application/xml');
    res.status(201).send(xml);
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});