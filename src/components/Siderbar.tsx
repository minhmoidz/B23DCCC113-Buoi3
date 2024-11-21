import { useState } from 'react'; // Chỉ cần import useState nếu không cần React

import { Link } from 'react-router-dom';
import '../css/siderbar.css'; // Import file CSS cho Navbar

const Siderbar: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<string>(''); // State để theo dõi mục được chọn

    // Hàm xử lý khi người dùng bấm vào một mục
    const handleItemClick = (item: string) => {
        setSelectedItem(item); // Cập nhật mục được chọn
    };

    return (
        <nav className="sidebar">
            <h1 className="sidebar-title">Quản lý Sản phẩm</h1>
            <ul className="sidebar-menu">
                <li>
                    <Link
                        to="/"
                        className={`sidebar-item ${selectedItem === 'home' ? 'selected' : ''}`}
                        onClick={() => handleItemClick('home')} // Cập nhật mục được chọn khi click vào "Quản lý Hàng Hóa"
                    >
                        Quản lý Hàng Hóa
                    </Link>
                </li>
                <li>
                    <Link
                        to="/guide"
                        className={`sidebar-item ${selectedItem === 'guide' ? 'selected' : ''}`}
                        onClick={() => handleItemClick('guide')} // Cập nhật mục được chọn khi click vào "Hướng Dẫn"
                    >
                        Hướng Dẫn
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Siderbar;
