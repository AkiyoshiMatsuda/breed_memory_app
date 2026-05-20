from flask import Flask, jsonify
import mysql.connector
import os
from dotenv import load_dotenv

app = Flask(__name__)
load_dotenv()

def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
    )

@app.route("/")
def index():
    return "Flask is running"

@app.route("/reptiles", methods=["GET"])
def get_reptiles():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM reptiles")
    reptiles = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(reptiles)

if __name__ == "__main__":
    app.run(debug=True)