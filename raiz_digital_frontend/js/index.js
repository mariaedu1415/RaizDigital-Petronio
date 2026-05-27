/*
  Busca os produtos no back e monta a vitrine.
*/

const campoBuscaHero = document.getElementById("campoBuscaHero");
const btnBuscaHero = document.getElementById("btnBuscaHero");
const campoBuscaProdutos = document.getElementById("campoBuscaProdutos");
const listaProdutos = document.getElementById("listaProdutos");
const mensagemSemResultado = document.getElementById("mensagemSemResultado");

let produtos = [];

async function carregarProdutos() {
  try {
    const resposta = await fetch("http://127.0.0.1:5000/produtos");
    produtos = await resposta.json();

    montarCards(produtos);
  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);
    listaProdutos.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger">
          Erro ao carregar produtos do backend.
        </div>
      </div>
    `;
  }
}

function montarCards(lista) {
  listaProdutos.innerHTML = "";

  if (lista.length === 0) {
    mensagemSemResultado.classList.remove("d-none");
    return;
  }

  mensagemSemResultado.classList.add("d-none");

  lista.forEach((produto) => {
    const imagem = produto.imagem_url || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=700&q=80";

    const card = `
      <div class="col-md-6 col-lg-3 product-item">
        <article class="product-card">
          <a href="detalhes.html?id=${produto.id}" class="text-decoration-none text-dark">
            <img src="${imagem}" alt="${produto.nome_produto}">
            <div class="product-card-body">
              <h3>${produto.nome_produto}</h3>
              <p><i class="bi bi-geo-alt"></i> ${produto.cidade} - PI</p>
              <strong>R$ ${Number(produto.preco).toFixed(2).replace(".", ",")} / ${produto.unidade || "unidade"}</strong>
            </div>
          </a>

          <div class="px-3 pb-3">
            <a
              class="btn btn-success btn-sm w-100"
              href="https://wa.me/55${produto.whatsapp}?text=Olá,%20tenho%20interesse%20no%20produto%20${encodeURIComponent(produto.nome_produto)}%20anunciado%20no%20Raiz%20Digital."
              target="_blank"
            >
              <i class="bi bi-whatsapp me-1"></i> Ver no WhatsApp
            </a>
          </div>
        </article>
      </div>
    `;

    listaProdutos.innerHTML += card;
  });
}

function filtrarProdutos(termoBusca) {
  const termo = termoBusca.toLowerCase().trim();

  const filtrados = produtos.filter((produto) => {
    return (
      produto.nome_produto.toLowerCase().includes(termo) ||
      produto.categoria.toLowerCase().includes(termo) ||
      produto.cidade.toLowerCase().includes(termo)
    );
  });

  montarCards(filtrados);
}

btnBuscaHero.addEventListener("click", () => {
  const termo = campoBuscaHero.value;
  campoBuscaProdutos.value = termo;
  filtrarProdutos(termo);
  document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
});

campoBuscaProdutos.addEventListener("input", () => {
  filtrarProdutos(campoBuscaProdutos.value);
});

campoBuscaHero.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
    btnBuscaHero.click();
  }
});

document.querySelectorAll(".category-card").forEach((botao) => {
  botao.addEventListener("click", () => {
    const categoria = botao.dataset.categoria;
    campoBuscaProdutos.value = categoria;
    campoBuscaHero.value = categoria;
    filtrarProdutos(categoria);
    document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
  });
});

carregarProdutos();