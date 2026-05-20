from flask import Flask, jsonify
import mysql.connector
# import os
# from dotenv import load_dotenv

app = Flask(__name__)
# load_dotenv()

def get_db_connection():
    return mysql.connector.connect(
        # host=os.getenv("MYSQL_HOST"),
        # port = int(os.getenv("MYSQL_PORT", 3306)),
        # user=os.getenv("MYSQL_USER"),
        # password=os.getenv("MYSQL_PASS"),
        # database=os.getenv("MYSQL_DB")
        # host='127.0.0.1',
        host='localhost',
        # port=3306,
        user='root',
        password='Ak1y0sz8',
        database='breeding'
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