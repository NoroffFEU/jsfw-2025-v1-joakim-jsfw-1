import { Link } from "react-router-dom";

type Product = {
  id: string;
  title: string;
  image: {
    url: string;
    alt: string;
  };
};

type ProductListProps = {
  products: Product[];
  selectedProductIndex: string;
  handleProductClick: (product: Product) => void;
};

const ProductList: React.FC<ProductListProps> = ({
  products,
  selectedProductIndex,
  handleProductClick,
}) => {
  return (
    <div className="bg-gray-500 max-h-96 overflow-y-scroll restultProductContainer">
      {products.map((product, index) => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          id={`product-${index}`}
          className={`py-2 px-4 flex items-center justify-between gap-8 hover:bg-gray-200 cursor-pointer ${
            selectedProductIndex === index.toString() ? "bg-gray-200" : ""
          }`}
          onClick={() => handleProductClick(product)}
        >
          <p className="font-medium">{product.title}</p>
          <img
            src={product.image.url}
            alt={product.image.alt}
            className="w-8"
          />
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
