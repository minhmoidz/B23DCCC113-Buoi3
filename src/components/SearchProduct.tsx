import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { searchProduct } from '../redux/productSlice'; // Thay .jsx bằng .ts hoặc .tsx nếu cần
import '../css/Search.css'; // Import file CSS cho tìm kiếm

const SearchProduct: React.FC = () => {
    const [query, setQuery] = useState<string>(''); // Định nghĩa kiểu cho useState
    const dispatch = useDispatch();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { // Định nghĩa kiểu cho sự kiện thay đổi
        setQuery(e.target.value);
        dispatch(searchProduct(e.target.value));
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Tìm kiếm hàng hóa"
                value={query}
                onChange={handleSearch}
                className="search-input"
            />
            <button className="search-button">
                Tìm
            </button>
        </div>
    );
};

export default SearchProduct;
