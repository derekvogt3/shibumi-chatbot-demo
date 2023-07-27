from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

# Create a SQLAlchemy object. We'll bind it to a Flask app later.
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# import psycopg2

# def get_db_connection():
#     return psycopg2.connect(
#         host='db',
#         database='mydatabase',
#         user='myuser',
#         password='mypassword'
#     )