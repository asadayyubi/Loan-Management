from flask import Flask
from .auth import auth_bp
from .loan import loan_bp


def register_routes(app: Flask):
    app.register_blueprint(auth_bp)
    app.register_blueprint(loan_bp)
