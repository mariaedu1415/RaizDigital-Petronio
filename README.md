# Raiz Digital

Plataforma web desenvolvida para fortalecer a agricultura familiar no Piauí, conectando pequenos produtores rurais diretamente aos consumidores finais.

## Sobre o projeto

O Raiz Digital funciona como uma vitrine digital de produtos da agricultura familiar. O produtor cadastra seus produtos, e o consumidor pode visualizar as informações e entrar em contato diretamente pelo WhatsApp.

## Funcionalidades

- Cadastro de produtos
- Upload de imagem do produto
- Vitrine digital
- Busca por produtos
- Página de detalhes do produto
- Contato via WhatsApp
- Layout responsivo

## Tecnologias utilizadas

### Frontend
- HTML
- CSS
- Bootstrap
- JavaScript

### Backend
- Python
- Flask

### Banco de dados
- PostgreSQL

# Como executar o projeto

## 1. Clone o repositório
git clone LINK_DO_REPOSITORIO

## 2. Acesse a pasta do backend
cd raiz_digital_backend

## 3. Instale as dependências
pip install flask flask-cors psycopg2-binary python-dotenv

## 4. Configure o arquivo .env
Crie um arquivo .env na pasta do backend:

DB_HOST=localhost
DB_PORT=5432
DB_NAME=raiz_digital
DB_USER=postgres
DB_PASSWORD=sua senha

## 5. Execute o backend
python app.py

#### O backend será iniciado em:
http://127.0.0.1:5000

## 6. Execute o frontend

Abra o arquivo:
index.html no navegador.

Estrutura do projeto
RaizDigital/
│
├── raiz_digital_backend/
│   ├── app.py
│   ├── database.py
│   ├── .env
│   └── uploads/
│
└── raiz_digital_frontend/
    ├── index.html
    ├── cadastro-produto.html
    ├── detalhes.html
    ├── css/
    └── js/

## Banco de dados
Tabela principal:

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome_produtor VARCHAR(150) NOT NULL,
    whatsapp VARCHAR(20) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    nome_produto VARCHAR(150) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    quantidade VARCHAR(50),
    unidade VARCHAR(30),
    descricao TEXT,
    imagem_url TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


# Objetivo
Promover inclusão digital, fortalecer a agricultura familiar e facilitar a conexão entre produtores e consumidores por meio de uma solução simples, acessível e responsiva.

Equipe
Maiara Kelly Freitas Arantes
Maria Eduarda Resplande da Silva
Thayla Thayane Silva Carvalho
Aissa Lorrayne Rodrigues Santos
Maria Eduarda Pereira Meiguins

Orientador: Davi Saraiva Barros
