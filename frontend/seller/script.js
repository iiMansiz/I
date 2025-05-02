document.addEventListener('DOMContentLoaded', function() {
    const productListContainer = document.querySelector('.products-container');
    const searchInput = document.querySelector('#search-input');
    const categoryFilter = document.querySelector('#category-filter');
    const sortOption = document.querySelector('#sort-option');

    let allProducts = []; // Menyimpan semua produk yang diambil

    function fetchProducts(query = '', category = '', sortBy = '') {
        let url = 'http://localhost:5000/products?';
        if (query) url += `q=${query}&`;
        if (category) url += `category=${category}&`;
        if (sortBy) url += `sort=${sortBy}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                allProducts = data;
                renderProducts(data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                productListContainer.innerHTML = '<p>Terjadi kesalahan saat memuat produk.</p>';
            });
    }

    function renderProducts(products) {
        productListContainer.innerHTML = '';
        if (products.length === 0) {
            productListContainer.innerHTML = '<p>Tidak ada produk ditemukan.</p>';
            return;
        }
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <h3>${product.product_name}</h3>
                <p>${product.product_description || 'Tidak ada deskripsi'}</p>
                <p>Harga: Rp ${product.price.toLocaleString()}</p>
                <p>Stok: ${product.stock}</p>
                ${product.product_images && product.product_images.length > 0 ? `<img src="${product.product_images[0]}" alt="${product.product_name}" style="max-width: 100px;">` : ''}
                <button data-product-id="${product.product_id}">Lihat Detail</button>
                <button data-product-id="${product.product_id}">Tambah ke Keranjang</button>
            `;
            productListContainer.appendChild(productCard);
        });

        // Tambahkan event listener untuk tombol detail dan tambah ke keranjang
        productCard.querySelectorAll('button[data-product-id]').forEach(button => {
            button.addEventListener('click', handleProductAction);
        });
    }

    function handleProductAction(event) {
        const productId = event.target.dataset.productId;
        if (event.target.textContent === 'Lihat Detail') {
            // Redirect ke halaman detail produk
            window.location.href = `/product/${productId}`;
        } else if (event.target.textContent === 'Tambah ke Keranjang') {
            // Implementasikan logika tambah ke keranjang (mungkin menggunakan localStorage atau state manajemen)
            console.log(`Produk ${productId} ditambahkan ke keranjang`);
        }
    }

    // Event listener untuk pencarian
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const filteredProducts = allProducts.filter(p => p.product_name.toLowerCase().includes(query) || (p.product_description && p.product_description.toLowerCase().includes(query)));
        renderProducts(filteredProducts);
    });

    // Event listener untuk filter kategori (asumsi ada elemen select dengan ID 'category-filter')
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const category = this.value;
            fetchProducts(searchInput.value, category, sortOption.value);
        });
    }

    // Event listener untuk sorting (asumsi ada elemen select dengan ID 'sort-option')
    if (sortOption) {
        sortOption.addEventListener('change', function() {
            const sortBy = this.value;
            // Implementasikan logika sorting di frontend atau backend
            let sortedProducts = [...allProducts];
            if (sortBy === 'price_asc') {
                sortedProducts.sort((a, b) => a.price - b.price);
            } else if (sortBy === 'price_desc') {
                sortedProducts.sort((a, b) => b.price - a.price);
            }
            renderProducts(sortedProducts);
        });
    }

    fetchProducts(); // Muat produk awal saat halaman dimuat
});

document.addEventListener('DOMContentLoaded', function() {
    const productListContainer = document.getElementById('seller-product-list');
    const addProductBtn = document.getElementById('add-product-btn');

    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => {
            window.location.href = '/seller/add_product.html';
        });
    }

    function fetchSellerProducts() {
        fetch('http://localhost:5000/products') // Perlu endpoint khusus untuk produk penjual
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    productListContainer.innerHTML = '<h3>Daftar Produk Anda</h3><table><thead><tr><th>Nama</th><th>Harga</th><th>Stok</th><th>Aksi</th></tr></thead><tbody>';
                    data.forEach(product => {
                        productListContainer.innerHTML += `
                            <tr>
                                <td>${product.product_name}</td>
                                <td>Rp ${product.price.toLocaleString()}</td>
                                <td>${product.stock}</td>
                                <td>
                                    <button data-product-id="${product.product_id}" class="edit-btn">Edit</button>
                                    <button data-product-id="${product.product_id}" class="delete-btn">Hapus</button>
                                </td>
                            </tr>
                        `;
                    });
                    productListContainer.innerHTML += '</tbody></table>';

                    // Tambahkan event listener untuk tombol edit dan hapus setelah tabel dibuat
                    document.querySelectorAll('.edit-btn').forEach(button => {
                        button.addEventListener('click', editProduct);
                    });
                    document.querySelectorAll('.delete-btn').forEach(button => {
                        button.addEventListener('click', deleteProduct);
                    });

                } else {
                    productListContainer.innerHTML = '<p>Gagal memuat produk.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                productListContainer.innerHTML = '<p>Terjadi kesalahan saat memuat produk.</p>';
            });
    }

    function editProduct(event) {
        const productId = event.target.dataset.productId;
        window.location.href = `/seller/edit_product.html?id=${productId}`;
    }

    function deleteProduct(event) {
        const productId = event.target.dataset.productId;
        if (confirm(`Apakah Anda yakin ingin menghapus produk dengan ID ${productId}?`)) {
            fetch(`http://localhost:5000/products/${productId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    alert('Produk berhasil dihapus.');
                    fetchSellerProducts(); // Muat ulang daftar produk
                } else {
                    alert('Gagal menghapus produk.');
                }            })
            .catch(error => {
                console.error('Error deleting product:', error);
                alert('Terjadi kesalahan saat menghapus produk.');
            });
        }
    }

    fetchSellerProducts(); // Muat daftar produk saat halaman dimuat
});

