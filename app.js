const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// importando o arquivo db.js
const db = require('./db');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//CREATE cadastro
app.post('/usuarios', (req, res) => {
    const { nome, email, telefone } = req.body;
    const sql = 'INSERT INTO usuario (nome, email, telefone) VALUES  (?, ?, ?)';
    db.query(sql, [nome, email, telefone], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Usuário cadastrado com sucesso!' });
    });
});
// read
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM	usuario', (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);

    })
});
// UPDATE (alteração0)
app.put('/usuarios/:id', (req, res) => {
    const { nome, email, telefone } = req.body;
    const { id } = req.params;

    const sql = 'UPDATE usuario SET nome=?, email=?, telefone=? WHERE id=?';
    db.query(sql, [nome, email, telefone, id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Usuário atualizado' });
    });
});
// exclusao DELETEEEEEEEEEEEEEEEEEEEEEE
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM usuario WHERE id =?', [id], (err) => {    
            if (err) return res.status(500).json(err);
            res.json({ message: 'Deletado com sucesso!' });
        });
});
app.listen(3000, () => {
    console.log('servidor rodando em localroost:3000');
});