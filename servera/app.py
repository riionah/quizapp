from dotenv import load_dotenv
load_dotenv()

from flask import Flask
from servera.config import Config
from servera.extensions import db, jwt

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)

    # Import routes
from servera.routes.authroutes import auth_bp
from servera.routes.qiuzroutes import quiz_bp
from servera.routes.admin import admin_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(quiz_bp, url_prefix="/api/quiz")
    app.register_blueprint(admin_bp, url_prefix="/api/admin")

    # Database test + table creation
    from sqlalchemy import text

    with app.app_context():
        try:
            db.session.execute(text("SELECT 1"))
            db.create_all()
            print("✅ Database Connected Successfully")
            print("✅ Tables Created Successfully")
        except Exception as e:
            print("❌ Database Error:", e)

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)