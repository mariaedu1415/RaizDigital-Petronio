
const formProduto = document.getElementById("formProduto");
const alertaCadastro = document.getElementById("alertaCadastro");

formProduto.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const formData = new FormData();

  formData.append("nome_produtor", document.getElementById("nomeProdutor").value);
  formData.append("whatsapp", document.getElementById("whatsapp").value);
  formData.append("cidade", document.getElementById("cidade").value);
  formData.append("nome_produto", document.getElementById("nomeProduto").value);
  formData.append("categoria", document.getElementById("categoriaProduto").value);

  const precoTratado = document
    .getElementById("precoProduto")
    .value
    .replace("R$", "")
    .replace(",", ".")
    .trim();

  formData.append("preco", precoTratado);
  formData.append("quantidade", document.getElementById("quantidadeProduto").value);
  formData.append("unidade", document.getElementById("unidadeProduto").value);
  formData.append("descricao", document.getElementById("descricaoProduto").value);

  const arquivoImagem = document.getElementById("fotoProduto").files[0];

  if (arquivoImagem) {
    formData.append("imagem", arquivoImagem);
  }

  try {
    const resposta = await fetch("http://127.0.0.1:5000/produtos", {
      method: "POST",
      body: formData
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
      alertaCadastro.classList.remove("d-none", "alert-danger");
      alertaCadastro.classList.add("alert-success");
      alertaCadastro.innerText = "Produto cadastrado com sucesso!";

      formProduto.reset();
    } else {
      alertaCadastro.classList.remove("d-none", "alert-success");
      alertaCadastro.classList.add("alert-danger");
      alertaCadastro.innerText = resultado.erro || "Erro ao cadastrar produto.";
    }

  } catch (erro) {
    alertaCadastro.classList.remove("d-none", "alert-success");
    alertaCadastro.classList.add("alert-danger");
    alertaCadastro.innerText = "Erro ao conectar com o backend.";
    console.error("Erro:", erro);
  }
});