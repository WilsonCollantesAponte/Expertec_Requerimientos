import "./assets/css/base/base.css";
import "./assets/css/componentes/card.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Page404 from "./pages/Page404";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </Router>
    );
}

export default App;
