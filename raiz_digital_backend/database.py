import os
import psycopg2
from dotenv import load_dotenv

# carrega as info do arquivo .env
load_dotenv()

def get_connection():
    """
    Cria e retorna uma conexão com o banco PostgreSQL.
    Essa função será usada pelo app.py sempre que precisar acessar o banco.
    """
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD")
    )