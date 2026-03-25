import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../interface/api";
import useShoppingCart from "../context/ShoppingcartContext";

function ProductPage() {
  const { productId } = useParams();
  const { addToCart } = useShoppingCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setError("Missing product ID.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://v2.api.noroff.dev/online-shop/${productId}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        setProduct(data.data);
      } catch (fetchError) {
        if (fetchError instanceof Error) {
          setError(fetchError.message);
        } else {
          setError("Unexpected error while loading product");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <main className="p-6">
        <p>Loading product...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="text-2xl font-bold mb-4">Product Page</h1>
        <p className="mb-6 text-red-500">Error: {error}</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="text-2xl font-bold mb-4">Product Page</h1>
        <p className="text-red-500 mb-6">{error ?? "Product not found."}</p>
      </main>
    );
  }

  const salePrice = product.discountedPrice ?? product.price;
  const hasDiscount = salePrice < product.price;
  const ratingValue = Number.isFinite(product.rating) ? product.rating : 0;

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="flex flex-col md:flex-row gap-8 mt-4">
        <img
          src={product.image.url}
          alt={product.image.alt}
          className="w-full md:w-96 object-cover rounded-lg"
        />

        <div className="flex flex-col gap-4 flex-1">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold">
              ${salePrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm font-medium text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
            {hasDiscount && (
              <span className="bg-red-100 text-red-600 text-sm font-medium px-2 py-0.5 rounded">
                Sale
              </span>
            )}
          </div>
          <p className="text-gray-200">{product.description}</p>
          {hasDiscount && (
            <p className="mb-1 text-[#324b51]">
              Discounted Price: ${product.discountedPrice ?? product.price}
            </p>
          )}
          <p className="text-sm text-gray-200">
            Rating: ⭐ {ratingValue.toFixed(1)} / 5
          </p>
          <button
            type="button"
            onClick={() =>
              addToCart({
                id: product.id,
                title: product.title,
                image: product.image,
                price: product.discountedPrice ?? product.price,
              })
            }
            className="w-fit rounded bg-[#812a00] px-6 py-3 text-white font-medium hover:bg-[#8f4b2a] transition-colors cursor-pointer"
            aria-label={`Add ${product.title} to cart`}
          >
            Add to cart
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductPage;
