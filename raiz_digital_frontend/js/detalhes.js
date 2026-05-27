/*
  DETALHES.JS - Responsável por carregar dinamicamente os dados de um produto específico.
*/

const params = new URLSearchParams(window.location.search);
const produtoId = params.get("id");

const conteudoProduto = document.getElementById("conteudoProduto");
const mensagemErro = document.getElementById("mensagemErro");

async function carregarDetalhesProduto() {
  if (!produtoId) {
    mostrarErro("Produto não informado na URL.");
    return;
  }

  try {
    const resposta = await fetch(`http://127.0.0.1:5000/produtos/${produtoId}`);

    if (!resposta.ok) {
      mostrarErro("Produto não encontrado.");
      return;
    }

    const produto = await resposta.json();

    preencherTela(produto);

  } catch (erro) {
    console.error("Erro ao buscar produto:", erro);
    mostrarErro("Erro ao conectar com o backend.");
  }
}

function preencherTela(produto) {
  const imagemPadrao =
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=80";

  const imagem = produto.imagem_url || imagemPadrao;

  document.getElementById("breadcrumbProduto").innerText = produto.nome_produto;
  document.getElementById("imagemProduto").src = imagem;
  document.getElementById("imagemProduto").alt = produto.nome_produto;

  document.getElementById("nomeProduto").innerText = produto.nome_produto;
  document.getElementById("nomeProdutor").innerText = produto.nome_produtor;
  document.getElementById("cidadeProduto").innerText = produto.cidade;

  document.getElementById("precoProduto").innerText =
    `R$ ${Number(produto.preco).toFixed(2).replace(".", ",")} / ${produto.unidade || "unidade"}`;

  document.getElementById("descricaoProduto").innerText =
    produto.descricao || "Produto cadastrado na plataforma Raiz Digital.";

  document.getElementById("categoriaProduto").innerText =
    produto.categoria || "Não informada";

  document.getElementById("quantidadeProduto").innerText =
    `${produto.quantidade || "Não informada"} ${produto.unidade || ""}`;

  document.getElementById("nomeProdutorCard").innerText = produto.nome_produtor;
  document.getElementById("cidadeProdutorCard").innerText = produto.cidade;

  const mensagemWhatsapp = encodeURIComponent(
    `Olá, tenho interesse no produto ${produto.nome_produto} anunciado no Raiz Digital.`
  );

  document.getElementById("botaoWhatsapp").href =
    `https://wa.me/55${produto.whatsapp}?text=${mensagemWhatsapp}`;
}

function mostrarErro(mensagem) {
  mensagemErro.innerText = mensagem;
  mensagemErro.classList.remove("d-none");
  conteudoProduto.classList.add("d-none");
}

carregarDetalhesProduto();