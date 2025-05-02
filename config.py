import os

class Config:
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = f"mysql+mysqlconnector://{os.environ.get('DB_USER', 'your_db_user')}:{os.environ.get('DB_PASSWORD', 'your_db_password')}@{os.environ.get('DB_HOST', 'localhost')}/{os.environ.get('DB_NAME', 'your_db_name')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your_secret_key') # Untuk sesi dan keamanan
    # Konfigurasi lain seperti API keys untuk payment/shipping gateway
