import useShoppingCart from "../context/ShoppingcartContext";
import { Link } from "react-router-dom";

export type StoreItemProps = {
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
  tags: string[];
  reviews: Array<{
    id: string;
    username: string;
    rating: number;
    description: string;
  }>;
};

export function StoreItem({
  id,
  title,
  description,
  price,
  discountedPrice,
  image,
  rating,
}: StoreItemProps) {
  const {
    getItemQuantity,
    addToCart,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useShoppingCart();

  const ratingValue = Number.isFinite(rating) ? rating : 0;
  const quantity = getItemQuantity(id);
  const originalPrice = Number(price) || 0;
  const salePrice = Number(discountedPrice) || originalPrice;
  const hasDiscount = salePrice < originalPrice;

  const imageSrc = image?.url?.trim();
  const imageAlt = image?.alt?.trim() || title;

  return (
    <article className="mb-4 rounded-lg border bg-white p-4 shadow-sm">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-44 w-full object-cover rounded-md"
        />
      ) : (
        <div className="flex h-44 w-full items-center justify-center rounded-md bg-gray-200 text-gray-500">
          No image
        </div>
      )}

      <h3 className="mt-3 text-lg text-black font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
      <p className="mt-1 text-sm text-yellow-600">
        ⭐ {ratingValue.toFixed(1)} / 5
      </p>

      <div className="mt-3 flex items-baseline gap-2">
        <span
          className={
            hasDiscount
              ? "text-sm font-medium text-gray-700 line-through"
              : "text-lg font-bold text-black"
          }
        >
          ${originalPrice.toFixed(2)}
        </span>

        {hasDiscount && (
          <span className="text-lg font-bold text-green-700">
            ${salePrice.toFixed(2)}
          </span>
        )}
      </div>

      <div className=" flex justify-end">
        <Link to={`/product/${id}`} className="text-gray-500  hover:underline">
          View Details
        </Link>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => addToCart({ id, title, image, price: salePrice })}
          className="rounded bg-black px-4 py-2 text-white cursor-pointer"
          aria-label={`Add ${title} to cart`}
        >
          Add to cart
        </button>

        {quantity > 0 && (
          <>
            <button
              type="button"
              onClick={() => decreaseCartQuantity(id)}
              className="h-8 w-8 rounded border"
              aria-label={`Decrease quantity of ${title}`}
            >
              -
            </button>
            <span className="min-w-6 text-center">{quantity}</span>
            <button
              type="button"
              onClick={() =>
                increaseCartQuantity({ id, title, image, price: salePrice })
              }
              className="h-8 w-8 rounded border"
              aria-label={`Increase quantity of ${title}`}
            >
              +
            </button>
          </>
        )}
      </div>
    </article>
  );
}
