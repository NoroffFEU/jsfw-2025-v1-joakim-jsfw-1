import { Link } from "react-router-dom";
import { useState } from "react";
import useShoppingCart from "../context/ShoppingcartContext";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const items = useShoppingCart((s) => s.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const toogleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="text-white bg-[#7f7d7d30] ">
      <nav className="flex items-center justify-between px-12 h-16 ">
        <a href="#" className="text-2xl font-bold border-2 px-2 py-1">
          OnlineShop
        </a>

        <div
          className={`dropdown-menu absolute lg:static top-16 lg:top-0 left-0 lg:left-auto bg-[#7f7d7d30] lg:bg-transparent w-full lg:w-auto flex flex-col lg:flex-row gap-8 items-center py-2 lg:py-0 text-lg font-bold transition-all duration-300  ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none lg:translate-y-0 lg:opacity-100 lg:pointer-events-auto"
          }`}
        >
          <ul className="flex flex-col lg:flex-row gap-8">
            <li className="hover:text-[#ffe9d0] cursor-pointer">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li className="hover:text-[#ffe9d0] cursor-pointer">
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>

          <div className="flex flex-col lg:flex-row items-center gap-8">
            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="relative cursor-pointer p-2 rounded-md"
            >
              <i className="fa-solid fa-cart-arrow-down text-white transition-all duration-200 hover:text-gray-500 hover:scale-110"></i>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
        <div
          className="toggle-button lg:hidden cursor-pointer"
          onClick={toogleMenu}
          aria-label="Toggle menu"
        >
          <i className="fa-solid fa-bars fa-lg"></i>
        </div>
      </nav>
    </header>
  );
}
