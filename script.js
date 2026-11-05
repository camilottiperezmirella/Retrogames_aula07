const API_URL = "http://localhost:3000";

const btnCadastrar = document.getElementById('btnCadastrar');
const btnCancelar = document.getElementById('btnCancelar');
const modal = document.getElementById('modalCadastro');
const form = document.getElementById('formJogos');
const lista = document.getElementById('listarJogos');
const mensagemVazia = document.getElementById('mensagemVazia');

// Abrir modal
btnCadastrar.addEventListener("click", () => {
    modal.showModal();
});

// Fechar modal
btnCancelar.addEventListener("click", () => {
    modal.close();
});



//Carregando as informações do BD(get)
async function carregarJogos() {
    try {
        const resposta = await fetch(API_URL + '/listar');
        const jogos = await resposta.json();

        lista.innerHTML = "";

        if (jogos.length === 0) {
            mensagemVazia.hidden = false;
            lista.appendChild(mensagemVazia);
            return;
        }

        mensagemVazia.hidden = true;

        // Renderizar os jogos
        jogos.forEach(jogo => {
            criarCard(
                jogo.nome, jogo.autor, jogo.genero, jogo.imagem_url, jogo.preco)
        })
    } catch (erro) {
        console.error("Erro ao carregar jogos:", erro);
        alert("Não foi possível conectar ao servidor");
    }
}

// Cadastrar jogo
form.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const novoJogo = {
        nome: document.getElementById("nome").value.trim(),
        autor: document.getElementById("autor").value.trim(),
        genero: document.getElementById("genero").value.trim(),
        imagem_url: document.getElementById("imagem").value.trim(),
        preco: Number(document.getElementById("preco").value)
    };
    try {
        const resposta = await fetch(API_URL + '/cadastrar', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoJogo)
        });

        if (resposta.ok) {
            form.reset();
            modal.close();
            carregarJogos();

        } else {
            alert("Erro ao cadastrar jogo. Verifique o banco de dados.");
        }

    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert("Erro de conexão com o servidor");
    }
});

// Criar card de cada jogo
function criarCard(nome, autor, genero, imagem, preco) {

    const card = document.createElement("article");
    card.classList.add("card-disco");

    // Capa do jogo
    const capa = document.createElement("div");
    capa.classList.add("capa");

    const imagemCapa = document.createElement("img");
    imagemCapa.src = imagem;
    imagemCapa.alt = "Capa do jogo " + nome;

    capa.appendChild(imagemCapa);

    // Informações do jogo
    const info = document.createElement("div");
    info.classList.add("info-disco");

    const titulo = document.createElement("h3");
    titulo.textContent = nome;

    const nomeAutor = document.createElement("p");
    nomeAutor.textContent = "Autor: " + autor;

    const nomeGenero = document.createElement("p");
    nomeGenero.textContent = "Gênero: " + genero;

    const valor = document.createElement("strong");
    valor.classList.add("preco");

    valor.textContent = Number(preco).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    info.append(titulo, nomeAutor, nomeGenero, valor);

    card.append(capa, info);

    lista.appendChild(card);
}

// Inicializar página
carregarJogos();