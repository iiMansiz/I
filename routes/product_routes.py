from flask import Blueprint, jsonify, request
from app import db
from models import Product, Shop, Category
# from utils import authenticate_seller # Contoh autentikasi untuk penjual

product_bp = Blueprint('products', __name__, url_prefix='/products')

@product_bp.route('', methods=['POST'])
# @authenticate_seller
def create_product():
    data = request.get_json()
    # Validasi data
    shop = Shop.query.get_or_404(data['shop_id'])
    category = Category.query.get_or_404(data['category_id'])
    new_product = Product(shop_id=shop.shop_id, category_id=category.category_id, product_name=data['product_name'], product_description=data.get('product_description'), price=data['price'], stock=data['stock'], product_images=data.get('product_images'))
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Produk berhasil ditambahkan', 'product_id': new_product.product_id}), 201

@product_bp.route('', methods=['GET'])
def get_products():
    products = Product.query.all()
    product_list = [{
        'product_id': p.product_id,
        'shop_id': p.shop_id,
        'category_id': p.category_id,
        'product_name': p.product_name,
        'product_description': p.product_description,
        'price': float(p.price),
        'stock': p.stock,
        'product_images': p.product_images,
        'upload_date': p.upload_date.isoformat()
    } for p in products]
    return jsonify(product_list), 200

@product_bp.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    product_data = {
        'product_id': product.product_id,
        'shop_id': product.shop_id,
        'category_id': product.category_id,
        'product_name': product.product_name,
        'product_description': product.product_description,
        'price': float(product.price),
        'stock': product.stock,
        'product_images': product.product_images,
        'upload_date': product.upload_date.isoformat()
    }
    return jsonify(product_data), 200

# ... (Route lain untuk update, delete produk, dll.)
