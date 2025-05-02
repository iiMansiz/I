from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_type = db.Column(db.Enum('pembeli', 'penjual'), nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    full_name = db.Column(db.String(100))
    phone_number = db.Column(db.String(20))
    address = db.Column(db.Text)
    registration_date = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    last_login = db.Column(db.TIMESTAMP)
    shops = db.relationship('Shop', backref='seller', lazy=True)
    orders = db.relationship('Order', backref='buyer', lazy=True)
    reviews = db.relationship('Review', backref='user', lazy=True)

class Shop(db.Model):
    __tablename__ = 'shops'
    shop_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    seller_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    shop_name = db.Column(db.String(100), unique=True, nullable=False)
    shop_description = db.Column(db.Text)
    shop_logo = db.Column(db.String(255))
    shop_created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    products = db.relationship('Product', backref='shop', lazy=True)

# ... (Definisikan model untuk tabel lainnya: Category, Product, Order, OrderItem, PaymentMethod, ShippingMethod, Review)
