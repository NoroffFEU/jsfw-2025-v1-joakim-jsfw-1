import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AutocomplettSearchBar from "./interface/AutocomplettSearchBar";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  image: {
    url: string;
    alt: string;
  };
  rating: number;
  tags: Array<string>;
  reviews: Array<{
    id: string;
    username: string;
    rating: number;
    description: string;
  }>;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [products, setProducts] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://v2.api.noroff.dev/online-shop/")
      .then((response) => {
        console.log("Response status:", response.status);
        console.log("Content-Type:", response.headers.get("content-type"));
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API response:", data);
        setProducts(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Full error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const toogleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const purchaseButtonClick = (productId: string): void => {
    console.log(`Purchase button clicked for product ID: ${productId}`);
  };
  return (
    <>
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
              <button className="cursor-pointer">
                <i
                  className="fa-solid fa-cart-arrow-down"
                  style={{ color: "#7fd1ae" }}
                ></i>
              </button>
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

      <main>
        <AutocomplettSearchBar />
        {loading && <p>Loading products...</p>}
        {error && <p>Error: {error}</p>}{" "}
        {!loading && !error && (
          <div className="product-list justify-items-center grid grid-cols-1 m-10 sm:grid-cols-3 gap-x-70 gap-y-6 p-6">
            {products.map((product: Product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="product-card block "
              >
                <div>
                  {" "}
                  <img
                    className="w-50 h-50"
                    src={product.image.url}
                    alt={product.image.alt}
                  />
                  <h2 className="font-bold  text-2xl  ">{product.title}</h2>
                  <p className="font-light">{product.description}</p>
                  <p className="font-medium">Price: ${product.price}</p>
                  <p className="font-medium">
                    Discounted Price: ${product.discountedPrice}
                  </p>
                  <p className="font-medium">Rating: {product.rating}</p>
                  <div className="reviews">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="review">
                        <h3>{review.username}</h3>
                        <p>Rating: {review.rating}</p>
                        <p>{review.description}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      purchaseButtonClick(product.id);
                    }}
                    className="bg-[#7f7d7d30] m-6 py-2 px-8 leading-6 rounded-full font-semibold tracking-wide cursor-pointer inline-flex items-center justify-center relative shadow transtion hover:bg-amber-300 hover:shadow-md outline-none ring-amber-300/70 ring-offset-2 focus-visible:ring-2 foucus:scale-[0.98] disabled:bg-amber-300/50 disabled:cursor-not-allowed disabled:shadow"
                  >
                    Buy
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default App;
