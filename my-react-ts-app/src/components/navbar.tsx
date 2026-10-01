import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Menu, ShoppingCart, X } from 'lucide-react'
import useShoppingCart from '../context/ShoppingcartContext'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const items = useShoppingCart((s) => s.items)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const toggleMenu = (): void => {
    setIsMenuOpen((isOpen) => !isOpen)
  }

  return (
    <header className="text-white bg-[#7f7d7d30] ">
      <nav className="relative flex h-16 items-center justify-between px-4 sm:px-6 lg:px-12">
        <Link to="/" className="text-2xl font-bold border-2 px-2 py-1">
          OnlineShop
        </Link>

        <div
          id="main-navigation"
          className={`absolute left-0 top-full z-50 w-full  bg-[#7f7d7d]/60 px-4 py-4 text-lg font-bold transition-all duration-300 lg:static lg:ml-auto lg:mr-6 lg:w-auto lg:bg-transparent lg:px-0 lg:py-0 ${
            isMenuOpen
              ? 'translate-y-0 '
              : '-translate-y-full opacity-0 pointer-events-none lg:translate-y-0 lg:opacity-100 lg:pointer-events-auto'
          }`}
        >
          <ul className="flex flex-col items-center gap-6 lg:flex-row lg:gap-8">
            <li className="cursor-pointer hover:text-[#ffe9d0]">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li className="cursor-pointer hover:text-[#ffe9d0]">
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative rounded-md p-2 hover:bg-white/10"
            aria-label={`Shopping cart with ${totalItems} items`}
          >
            <ShoppingCart aria-hidden="true" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="rounded-md p-2 hover:bg-white/10 lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-controls="main-navigation"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X aria-hidden="true" />
            ) : (
              <Menu aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}
