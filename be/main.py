from flask import Flask, jsonify, request
import mysql.connector
import os
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash

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

# ユーザー登録用のエンドポイント
@app.route("/users", methods=["POST"])
def create_user():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    password_hash = generate_password_hash(password)
    
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO users(
        name, email, password_hash) 
    VALUES (%s, %s, %s)"""
    , (name, email, password_hash))

    conn.commit()

    user_id = cursor.lastrowid

    cursor.close()
    conn.close()

    return jsonify({
        "status": "success",
        "id": user_id,
        "message": "user created"
    }), 201

@app.route('/login', methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if user and check_password_hash(user["password_hash"], password):
        return jsonify({
            "status": "success",
            "id": user["id"],
            "message": "login successful"
        }), 200
    else:
        return jsonify({
            "status": "error",
            "message": "invalid credentials"
        }), 401

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