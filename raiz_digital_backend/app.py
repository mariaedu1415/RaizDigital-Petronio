from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from database import get_connection

import os
import uuid
from werkzeug.utils import secure_filename

app = Flask(__name__)


#nossa conexão do frontend com o backend
CORS(app)

#pasta das imagens
UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp"}

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

#Cria a pasta uploads caso ela não exista
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

#validar a imagem 
def arquivo_permitido(nome_arquivo):
    """
    Verifica se a extensão do arquivo é permitida.
    """
    return (
        "." in nome_arquivo and
        nome_arquivo.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
    )


#rota da imagem
@app.route("/uploads/<nome_arquivo>")
def visualizar_imagem(nome_arquivo):
    """
    Retorna a imagem salva na pasta uploads.
    """
    return send_from_directory(app.config["UPLOAD_FOLDER"], nome_arquivo)


#rota do home
@app.route("/")
def home():
    return jsonify({
        "mensagem": "Backend do Raiz Digital funcionando!"
    })


#rota de cadastrar produto
@app.route("/produtos", methods=["POST"])
def cadastrar_produto():
    """
    Cadastra um novo produto no banco PostgreSQL.
    Também realiza upload da imagem.
    """

    try:

        #recbe dados do form
        dados = request.form

        # Recebe o arquivo enviado
        arquivo = request.files.get("imagem")

        # URL da imagem começa vazia
        imagem_url = ""

        #processa imagem
        if arquivo and arquivo.filename != "":

            if arquivo_permitido(arquivo.filename):

                nome_seguro = secure_filename(arquivo.filename)

                # Gera nome unico para evitar conflito
                nome_unico = f"{uuid.uuid4().hex}_{nome_seguro}"

                # caminho completo da imagem
                caminho_imagem = os.path.join(
                    app.config["UPLOAD_FOLDER"],
                    nome_unico
                )

                arquivo.save(caminho_imagem)

                # url que vai salva no banco
                imagem_url = (
                    f"http://127.0.0.1:5000/uploads/{nome_unico}"
                )

        # recbe os campos do produto aqui
        nome_produtor = dados.get("nome_produtor")
        whatsapp = dados.get("whatsapp")
        cidade = dados.get("cidade")

        nome_produto = dados.get("nome_produto")
        categoria = dados.get("categoria")
        preco = dados.get("preco")

        quantidade = dados.get("quantidade")
        unidade = dados.get("unidade")

        descricao = dados.get("descricao")

        
        conn = get_connection()
        cursor = conn.cursor()

        #insert 
        sql = """
            INSERT INTO produtos (
                nome_produtor,
                whatsapp,
                cidade,
                nome_produto,
                categoria,
                preco,
                quantidade,
                unidade,
                descricao,
                imagem_url
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id;
        """

        cursor.execute(sql, (
            nome_produtor,
            whatsapp,
            cidade,
            nome_produto,
            categoria,
            preco,
            quantidade,
            unidade,
            descricao,
            imagem_url
        ))

        produto_id = cursor.fetchone()[0]

        conn.commit()

        cursor.close()
        conn.close()

        #retorno de sucesso
        return jsonify({
            "mensagem": "Produto cadastrado com sucesso!",
            "id": produto_id,
            "imagem_url": imagem_url
        }), 201

    except Exception as erro:

        return jsonify({
            "erro": "Erro ao cadastrar produto",
            "detalhes": str(erro)
        }), 500


# Lista de produtos

@app.route("/produtos", methods=["GET"])
def listar_produtos():
    """
    Lista todos os produtos cadastrados.
    """

    try:

        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT
                id,
                nome_produtor,
                whatsapp,
                cidade,
                nome_produto,
                categoria,
                preco,
                quantidade,
                unidade,
                descricao,
                imagem_url,
                criado_em
            FROM produtos
            ORDER BY criado_em DESC;
        """)

        registros = cursor.fetchall()

        produtos = []

        for item in registros:

            produtos.append({
                "id": item[0],
                "nome_produtor": item[1],
                "whatsapp": item[2],
                "cidade": item[3],
                "nome_produto": item[4],
                "categoria": item[5],
                "preco": float(item[6]),
                "quantidade": item[7],
                "unidade": item[8],
                "descricao": item[9],
                "imagem_url": item[10],
                "criado_em": str(item[11])
            })

        cursor.close()
        conn.close()

        return jsonify(produtos), 200

    except Exception as erro:

        return jsonify({
            "erro": "Erro ao listar produtos",
            "detalhes": str(erro)
        }), 500

#busca pelo id
@app.route("/produtos/<int:id>", methods=["GET"])
def buscar_produto_por_id(id):
    """
    Busca um produto específico pelo ID.
    """

    try:

        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT
                id,
                nome_produtor,
                whatsapp,
                cidade,
                nome_produto,
                categoria,
                preco,
                quantidade,
                unidade,
                descricao,
                imagem_url,
                criado_em
            FROM produtos
            WHERE id = %s;
        """, (id,))

        item = cursor.fetchone()

        cursor.close()
        conn.close()

        
        if item is None:

            return jsonify({
                "mensagem": "Produto não encontrado"
            }), 404

        produto = {
            "id": item[0],
            "nome_produtor": item[1],
            "whatsapp": item[2],
            "cidade": item[3],
            "nome_produto": item[4],
            "categoria": item[5],
            "preco": float(item[6]),
            "quantidade": item[7],
            "unidade": item[8],
            "descricao": item[9],
            "imagem_url": item[10],
            "criado_em": str(item[11])
        }

        return jsonify(produto), 200

    except Exception as erro:

        return jsonify({
            "erro": "Erro ao buscar produto",
            "detalhes": str(erro)
        }), 500



if __name__ == "__main__":
    app.run(debug=True)