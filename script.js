
const btnCadastrar = document.getElementById("btnCadastrar");
const btnCancelar = document.getElementById("btnCancelar");

const modalCadastro = document.getElementById("modalCadastro");
const formJogo = document.getElementById("formJogo");

const listarJogos = document.getElementById("listarJogos");
const mensagemVazia = document.getElementById("mensagemVazia");

btnCadastrar.addEventListener("click", () => {
    modalCadastro.showModal();
});

btnCancelar.addEventListener("click", () => {
    modalCadastro.close();
});

modalCadastro.addEventListener("click", (event) => {
    if (event.target === modalCadastro) {
        modalCadastro.close();
    }
});

function formatarPreco(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function criarCardJogo(jogo) {
    const card = document.createElement("article");
    card.classList.add("card-jogo");

    const capa = document.createElement("div");
    capa.classList.add("capa");

    const imagem = document.createElement("img");
    imagem.src = jogo.imagem_url;
    imagem.alt = `Capa do jogo ${jogo.titulo}`;
    imagem.loading = "lazy";

    imagem.addEventListener("error", () => {
        imagem.remove();
        capa.textContent = "🎮 Imagem indisponível";
    }, { once: true });

    capa.appendChild(imagem);

    const informacoes = document.createElement("div");
    informacoes.classList.add("info-jogo");

    const titulo = document.createElement("h3");
    titulo.textContent = jogo.titulo;

    const plataforma = document.createElement("p");
    plataforma.textContent = `Plataforma: ${jogo.plataforma}`;

    const desenvolvedora = document.createElement("p");
    desenvolvedora.textContent =
        `Desenvolvedora: ${jogo.desenvolvedora}`;

    const preco = document.createElement("span");
    preco.classList.add("preco");
    preco.textContent = formatarPreco(jogo.preco);

    informacoes.append(
        titulo,
        plataforma,
        desenvolvedora,
        preco
    );

    card.append(capa, informacoes);

    return card;
}

formJogo.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!formJogo.reportValidity()) {
        return;
    }

    const jogo = {
        titulo: document.getElementById("titulo").value.trim(),
        plataforma: document.getElementById("plataforma").value.trim(),
        desenvolvedora: document
            .getElementById("desenvolvedora").value.trim(),
        imagem_url: document.getElementById("imagem_url").value.trim(),
        preco: Number(document.getElementById("preco").value)
    };

    
    if (
        !jogo.titulo ||
        !jogo.plataforma ||
        !jogo.desenvolvedora ||
        !jogo.imagem_url ||
        !Number.isFinite(jogo.preco) ||
        jogo.preco <= 0
    ) {
        return;
    }

  
    const card = criarCardJogo(jogo);
    listarJogos.appendChild(card);

  
    mensagemVazia.hidden = true;

    formJogo.reset();
    modalCadastro.close();
});
