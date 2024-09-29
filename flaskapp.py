from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

# MySQL database configuration
db_config = {
    'user': 'root',
    'password': '123456789',
    'host': 'localhost',
    'database': 'voteinfo'
}

def get_db_connection():
    return mysql.connector.connect(**db_config)

@app.route('/api/boothvotes2023', methods=['GET'])
def get_booth_votes_2023():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM boothvotes2023")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data)

@app.route('/api/boothvotes2018', methods=['GET'])
def get_booth_votes_2018():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM boothvotes2018")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data)

@app.route('/api/boothvotes2013', methods=['GET'])
def get_booth_votes_2013():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM boothvotes2013")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data)

@app.route('/api/boothvotes2008', methods=['GET'])
def get_booth_votes_2008():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM boothvotes2008")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data)

@app.route('/api/boothvotes2003', methods=['GET'])
def get_booth_votes_2003():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM boothvotes2003")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data)

@app.route('/api/voterchanges2023', methods=['GET'])
def get_voter_changes_2023():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM voterchanges2023")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data)

@app.route('/api/voterchanges2018', methods=['GET'])
def get_voter_changes_2018():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM voterchanges2018")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data)

@app.route('/api/voterchanges2013', methods=['GET'])
def get_voter_changes_2013():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM voterchanges2013")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data)

@app.route('/api/voterchanges2008', methods=['GET'])
def get_voter_changes_2008():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM voterchanges2008")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data)

@app.route('/api/voterchanges2003', methods=['GET'])
def get_voter_changes_2003():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM voterchanges2003")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data)


if __name__ == '__main__':
    app.run(port=3000)
