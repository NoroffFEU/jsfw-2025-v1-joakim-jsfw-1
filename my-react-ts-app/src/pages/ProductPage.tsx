import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Product } from "../interface/api";

function ProductPage() {
  const { productId } = useParams();

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
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Product Page</h1>
        <p className="mb-6 text-red-500">Error: {error}</p>
        <Link to="/" className="underline font-medium">
          Back to home
        </Link>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Product Page</h1>
        <p className="mb-6">Product not found.</p>
        <Link to="/" className="underline font-medium">
          Back to home
        </Link>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>

      <img
        src={product.image.url}
        alt={product.image.alt}
        className="w-72 max-w-full mb-4"
      />

      <p className="mb-2">{product.description}</p>
      <p className="mb-1">Price: ${product.price}</p>
      <p className="mb-1">Discounted Price: ${product.discountedPrice}</p>
      <p className="mb-4">Rating: {product.rating}</p>

      <Link to="/" className="underline font-medium">
        Back to home
      </Link>
    </main>
  );
}

export default ProductPage;
