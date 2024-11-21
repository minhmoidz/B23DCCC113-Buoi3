import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, deleteProduct, updateProduct, searchProduct } from '../redux/productSlice'; // Nhập chính xác tên hành động
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap'; // Import modal từ Bootstrap
import '../css/ProductList.css'; // CSS styles

// Định nghĩa kiểu dữ liệu cho product
interface Product {
    id: number;
    name: string;
    price: string;
    category: string;
}

const ProductList: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false); // Trạng thái để điều khiển modal
    const [name, setName] = useState<string>(''); 
    const [price, setPrice] = useState<string>(''); 
    const [category, setCategory] = useState<string>('Văn phòng phẩm'); // Giá trị mặc định
    const [editProduct, setEditProduct] = useState<Product | null>(null); // Để lưu sản phẩm đang chỉnh sửa
    const [currentPage, setCurrentPage] = useState<number>(1); // Trang hiện tại
    const [productsPerPage] = useState<number>(5); // Số sản phẩm mỗi trang

    const products = useSelector((state: any) => state.products.products); // Sử dụng any nếu không định nghĩa kiểu store
    const searchQuery = useSelector((state: any) => state.products.searchQuery); // Lấy searchQuery từ Redux
    const dispatch = useDispatch();

    // Lọc sản phẩm dựa trên tìm kiếm
    const filteredProducts = products.filter((product: Product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Tính toán số lượng trang
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Lấy sản phẩm của trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Xử lý mở modal khi bấm vào nút chỉnh sửa
    const handleEditProduct = (product: Product) => {
        setEditProduct(product);
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setShowModal(true);
    };

    // Đóng Modal
    const handleClose = () => {
        setShowModal(false);
        setEditProduct(null); // Reset khi đóng modal
    };

    // Xử lý thêm sản phẩm mới
    const handleAddProduct = () => {
        if (name && price) {
            dispatch(addProduct({ id: Date.now(), name, price, category }));
            setName('');
            setPrice('');
            setCategory('Văn phòng phẩm');
            handleClose();
        } else {
            alert('Vui lòng nhập đầy đủ thông tin!');
        }
    };

    // Xử lý cập nhật sản phẩm
    const handleUpdateProduct = () => {
        if (name && price && editProduct) {
            dispatch(updateProduct({ id: editProduct.id, name, price, category }));
            setName('');
            setPrice('');
            setCategory('Văn phòng phẩm');
            handleClose();
        } else {
            alert('Vui lòng nhập đầy đủ thông tin!');
        }
    };

    // Chuyển đến trang trước
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Chuyển đến trang sau
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="product-list-container">
            <h1 className="table-title">Bảng Thông Tin</h1>
            <div className="header-actions">
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    Thêm Hàng Hóa
                </Button>
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchQuery}
                    onChange={(e) => dispatch(searchProduct(e.target.value))}
                    className="search-input"
                />
            </div>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Giá</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product: Product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>
                                    <button
                                        onClick={() => dispatch(deleteProduct(product.id))}
                                        className="btn btn-danger"
                                    >
                                        Xóa
                                    </button>
                                    <button
                                        onClick={() => handleEditProduct(product)}
                                        className="btn btn-info"
                                    >
                                        Chỉnh sửa
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center">
                                Không tìm thấy sản phẩm nào.
                            </td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td>Tổng số</td>
                        <td>{filteredProducts.length}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>

            {/* Nút chuyển trang */}
            <div className="pagination">
                <Button
                    variant="secondary"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    Trang Trước
                </Button>
                <span>Trang {currentPage} / {totalPages}</span>
                <Button
                    variant="secondary"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Trang Sau
                </Button>
            </div>

            {/* Modal AddProduct */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editProduct ? 'Cập nhật Hàng Hóa' : 'Thêm Hàng Hóa'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Tên Hàng Hóa</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tên hàng hóa"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Giá Hàng Hóa</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Giá hàng hóa"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Danh mục</label>
                        <select
                            className="form-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="Văn phòng phẩm">Văn phòng phẩm</option>
                            <option value="Đồ gia dụng">Đồ gia dụng</option>
                            <option value="Thực phẩm">Thực phẩm</option>
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="success" onClick={editProduct ? handleUpdateProduct : handleAddProduct}>
                        {editProduct ? 'Cập nhật Hàng Hóa' : 'Thêm hàng hóa'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProductList;
