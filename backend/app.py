from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db , TokenBlocklist
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_cors import CORS
from datetime import timedelta
from Views import *
app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://quizdb_nlhu_user:H4afQ6D4F3Q1Z89vdq4EpfNlMZecWJFk@dpg-cue5hclds78s73a7bkkg-a.oregon-postgres.render.com/quizdb_nlhu"  
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


db.init_app(app)
migrate = Migrate(app, db)
mail = Mail(app)


app.config["MAIL_SERVER"]= 'smtp.gmail.com'
app.config["MAIL_PORT"]=587
app.config["MAIL_USE_TLS"]=True
app.config["MAIL_USE_SSL"]=False
app.config["MAIL_USERNAME"]="mubarak.nassib@student.moringaschool.com"
app.config['MAIL_PASSWORD'] = 'afyf pjsa ubln brzf'  
app.config['MAIL_DEFAULT_SENDER'] = 'mubarak.nassib@student.moringaschool.com'



app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)
app.register_blueprint(quiz_bp)
app.register_blueprint(Questions_bp)
app.register_blueprint(Attempt_bp)
app.register_blueprint(result_bp)

# jwt

# jwt
app.config["JWT_SECRET_KEY"] = "jiyucfvbkaudhudkvfbt" 
app.config["JWT_ACCESS_TOKEN_EXPIRES"] =  timedelta(hours=1)
jwt = JWTManager(app)
jwt.init_app(app)

@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()

    return token is not None