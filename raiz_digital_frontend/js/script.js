/*
  Funções atuais: Busca e filtro dos produtos, Filtro por categoria
*/

const campoBuscaHero = document.getElementById("campoBuscaHero");
const btnBuscaHero = document.getElementById("btnBuscaHero");
const campoBuscaProdutos = document.getElementById("campoBuscaProdutos");
const produtos = document.querySelectorAll(".product-item");
const mensagemSemResultado = document.getElementById("mensagemSemResultado");

function filtrarProdutos(termoBusca) {
  const termo = termoBusca.toLowerCase().trim();
  let quantidadeVisivel = 0;

  produtos.forEach((produto) => {
    const nome = produto.dataset.nome || "";
    const categoria = produto.dataset.categoria || "";
    const cidade = produto.dataset.cidade || "";

    const encontrado =
      nome.includes(termo) ||
      categoria.includes(termo) ||
      cidade.includes(termo);

    if (encontrado) {
      produto.classList.remove("d-none");
      quantidadeVisivel++;
    } else {
      produto.classList.add("d-none");
    }
  });

  if (quantidadeVisivel === 0) {
    mensagemSemResultado.classList.remove("d-none");
  } else {
    mensagemSemResultado.classList.add("d-none");
  }
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

const formProduto = document.getElementById("formProduto");
const alertaCadastro = document.getElementById("alertaCadastro");

formProduto.addEventListener("submit", (evento) => {
  evento.preventDefault();

  // Simulação visual do cadastro no frontend.
  alertaCadastro.classList.remove("d-none");
  formProduto.reset();

  setTimeout(() => {
    alertaCadastro.classList.add("d-none");
  }, 5000);
});
