
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Siderbar'; // Giả sử Sidebar.tsx đã là TSX
import ProductList from "../src/components/ProductList"; // Giả sử ProductList.tsx đã là TSX
import Guide from '../src/components/Guide'; // Giả sử Guide.tsx đã là TSX

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/guide" element={<Guide />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
