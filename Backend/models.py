from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

metadata = MetaData ()

db = SQLAlchemy (metadata=metadata) 

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128), nullable=False,unique=True)
    email= db.Column(db.String(128),nullable=False,unique=True)
    role = db.Column(db.String(64), nullable=False, default="user")

    grade=db.Column(db.Integer, nullable=False)
    password=db.Column(db.String(128), nullable=False)
    
    books=db.relationship('Books',backref='user',lazy=True)

class Books(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    Title= db.Column(db.String(128), nullable=False)
    Genre=db.Column(db.String(128), nullable=False)
    borrowed_at = db.Column(db.DateTime, nullable=False)
    returned_at = db.Column(db.DateTime, nullable=True)

   
    
    user_id=db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False)
    