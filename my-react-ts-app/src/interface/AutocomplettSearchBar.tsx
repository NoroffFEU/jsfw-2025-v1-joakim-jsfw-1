import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import ProductList from "./ProductList";

type Product = {
  id: string;
  title: string;
  image: {
    url: string;
    alt: string;
  };
};

const AutocompleteSearchBar = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductIndex, setSelectedProductIndex] =
    useState<string>("-1");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        "https://v2.api.noroff.dev/online-shop/",
      );
      setProducts(Array.isArray(data?.data) ? data.data : []);
    };
    fetchProducts();
  }, []);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setQuery(event.target.value);
    setSelectedProductIndex("-1");
    setSearchResults(
      products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm),
      ),
    );
  };

  const clearSearchUI = () => {
    setQuery("");
    setSelectedProductIndex("-1");
    setSearchResults([]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      setSelectedProductIndex((prevState) =>
        prevState === "-1"
          ? (searchResults.length - 1).toString()
          : (parseInt(prevState) - 1).toString(),
      );
    } else if (event.key === "ArrowDown") {
      setSelectedProductIndex((prevState) =>
        prevState === (searchResults.length - 1).toString()
          ? "-1"
          : (parseInt(prevState) + 1).toString(),
      );
    } else if (event.key === "Enter") {
      if (selectedProductIndex !== "-1") {
        const selectedProduct = searchResults[parseInt(selectedProductIndex)];
        if (!selectedProduct) return;
        navigate(`/product/${selectedProduct.id}`);
        clearSearchUI();
      }
    }
  };

  const handleProductClick = (_product: Product) => {
    navigate(`/product/${_product.id}`);
    clearSearchUI();
  };

  const scrollActiveProductIntoView = (index: number) => {
    const activeProduct = document.getElementById(`product-${index}`);
    if (activeProduct) {
      activeProduct.scrollIntoView({
        block: "nearest",
        inline: "start",
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (selectedProductIndex !== "-1") {
      scrollActiveProductIntoView(parseInt(selectedProductIndex));
    }
  }, [selectedProductIndex]);

  return (
    <div className="flex flex-col max-w-lg mt-10 mx-auto ">
      <SearchInput
        value={query}
        onChange={handleQueryChange}
        onKeyDown={handleKeyDown}
        inputRef={inputRef}
        placeholder="Search products"
      />

      {query !== "" && searchResults.length > 0 && (
        <ProductList
          products={searchResults}
          selectedProductIndex={selectedProductIndex}
          handleProductClick={handleProductClick}
        />
      )}
    </div>
  );
};

export default AutocompleteSearchBar;
