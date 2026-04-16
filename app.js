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
app.post('/usuarios',(req, res) => {
    const { nome, email, telefone } = req.body;
const sql = 'INSERT INTO usuario (nome, email, telefone) VALUES  (?, ?, ?)';
db.query(sql, [nome, email, telefone], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Usuário cadastrado com sucesso!' });
});
});
app.get('/usuarios', (req, res)=>{
	db.query('SELECT * FROM	usuario',	(err, rows) =>{
		if (err) return res.status(500).json(err);
		res.json(rows);

})});
app.listen(3000, ()=>{
    console.log('servidor rodando em localroost:3000');
});