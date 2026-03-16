import { Routes, Route } from "react-router-dom";
import ContactPage from "./pages/ContactPage";
import ProductPage from "./pages/ProductPage";
import HomePage from "./pages/HomePage";
import { Navbar } from "./components/navbar";
import ShoppingCart from "./components/ShoppingCart";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
}

export default App;
