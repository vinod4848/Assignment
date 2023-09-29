import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import ProductList from "./pages/ProductList";
import AddProduct from "../src/pages/AddProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="products" element={<AddProduct />} />
          <Route path="product/:id" element={<AddProduct />} />

        </Route>
      </Routes>
    </Router>
  );
}
export default App;
