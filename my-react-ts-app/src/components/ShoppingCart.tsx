import useShoppingCart from "../context/ShoppingcartContext";
import { Link } from "react-router-dom";

export default function ShoppingCart() {
  const items = useShoppingCart((s) => s.items);
  const increaseCartQuantity = useShoppingCart((s) => s.increaseCartQuantity);
  const decreaseCartQuantity = useShoppingCart((s) => s.decreaseCartQuantity);
  const removeFromCart = useShoppingCart((s) => s.removeFromCart);
  const clearCart = useShoppingCart((s) => s.clearCart);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return <p className="text-gray-600">Your cart is empty.</p>;
  }

  return (
    <section className="space-y-4 mt-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Cart ({totalItems})</h2>
      </div>

      <ul className="space-y-3">
        {items.map((item) => {
          const lineTotal = item.price * item.quantity;
          return (
            <li
              key={item.id}
              className="flex items-center justify-between rounded border p-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.image.url}
                  alt={item.image.alt}
                  className="h-14 w-14 rounded object-cover"
                />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-200">
                    ${item.price.toFixed(2)} × {item.quantity} = $
                    {lineTotal.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-200">Qty: {item.quantity}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => decreaseCartQuantity(item.id)}
                  className="h-8 w-8 rounded border"
                  aria-label={`Decrease quantity of ${item.title}`}
                >
                  -
                </button>
                <span className="min-w-6 text-center">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() =>
                    increaseCartQuantity({
                      id: item.id,
                      title: item.title,
                      image: item.image,
                      price: item.price,
                    })
                  }
                  className="h-8 w-8 rounded border"
                  aria-label={`Increase quantity of ${item.title}`}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="ml-2 rounded bg-red-500 px-3 py-2 text-white hover:bg-red-600 transition-colors cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-end border-t pt-2 pr-2">
        <p className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</p>
      </div>
      <div className="flex justify-center pt-2 gap-10">
        <button
          type="button"
          onClick={clearCart}
          className="rounded bg-[#812a00] px-3 py-1 text-sm hover:bg-[#8f4b2a] transition-colors cursor-pointer"
        >
          Clear cart
        </button>
        <Link
          to="/checkout"
          className="inline-flex items-center justify-center rounded bg-[#812a00] px-6 py-2 text-white hover:bg-[#8f4b2a] transition-colors"
        >
          Checkout
        </Link>
      </div>
    </section>
  );
}
