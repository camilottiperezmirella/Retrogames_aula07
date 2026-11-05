const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_retro_games"
})

db.connect((erro)=>{
    if(erro){
        console.error("Erro ao conectar o msql:", erro)
    }else{
        console.log("Conectado ao BD com sucesso!")
    }
})

const mostrarJogos = (req, res) => {

    const sql = "SELECT id, nome, autor, genero, imagem_url, preco FROM jogos";
    db.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).send("Erro ao consultar o BD");
        }
        res.send(resultados);
    })
}


const novoJogos = (req, res) => {
    const { nome, autor, genero, imagem_url, preco } = req.body;
    if (nome && autor && genero && imagem_url && preco) {
        const sql = "INSERT INTO jogos (nome, autor, genero, imagem_url, preco) VALUES (?, ?, ?, ?, ?)";
        const valores = [nome, autor, genero, imagem_url, preco];
        db.query(sql, valores, (erro, resultado) => {
            if (erro) {
                return res.status(500).send("Erro ao inserir jogo")
            }
            res.send("Jogo cadastrado com sucesso");
        })
    } else {
        res.status(400).send("Erro: Preencha todos os campos")
    }
}

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const porta = 3000


app.get("/listar", mostrarJogos)
app.post("/cadastrar", novoJogos)

app.listen(porta,()=>{
    console.log(`Servidor rodando na porta${porta}`)
})