from flask import Blueprint, jsonify, request
from app import db
from models import User
# from utils import authenticate # Contoh fungsi autentikasi

user_bp = Blueprint('users', __name__, url_prefix='/users')

@user_bp.route('', methods=['POST'])
def create_user():
    data = request.get_json()
    # Validasi data
    new_user = User(user_type=data['user_type'], username=data['username'], email=data['email'], password=data['password'], full_name=data.get('full_name'), phone_number=data.get('phone_number'), address=data.get('address'))
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Pengguna berhasil dibuat', 'user_id': new_user.user_id}), 201

@user_bp.route('/<int:user_id>', methods=['GET'])
# @authenticate # Contoh penggunaan autentikasi
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    user_data = {
        'user_id': user.user_id,
        'user_type': user.user_type,
        'username': user.username,
        'email': user.email,
        'full_name': user.full_name,
        'phone_number': user.phone_number,
        'address': user.address,
        'registration_date': user.registration_date.isoformat(),
        'last_login': user.last_login.isoformat() if user.last_login else None
    }
    return jsonify(user_data), 200

# ... (Route lain untuk login, update profil, dll.)
