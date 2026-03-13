import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useShoppingCart from "../context/ShoppingcartContext";

type CheckoutPageProps = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zip: string;
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const items = useShoppingCart((s) => s.items);
  const clearCart = useShoppingCart((s) => s.clearCart);

  const [form, setForm] = useState<CheckoutPageProps>({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );
  const shipping = items.length > 0 ? 49 : 0;
  const total = subtotal + shipping;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    clearCart();
    navigate("/", { replace: true });
  };

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="mb-4 text-2xl font-bold">Checkout</h1>
        <p className="mb-6 text-gray-600">Your cart is empty.</p>
        <Link to="/cart" className="underline">
          Go to cart
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto grid max-w-5xl gap-6 p-6 md:grid-cols-2">
      <section>
        <h1 className="mb-4 text-2xl font-bold">Checkout</h1>

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            name="fullName"
            value={form.fullName}
            onChange={onChange}
            required
            placeholder="Full name"
            className="w-full rounded border p-2"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            placeholder="Email"
            className="w-full rounded border p-2"
          />
          <input
            name="address"
            value={form.address}
            onChange={onChange}
            required
            placeholder="Address"
            className="w-full rounded border p-2"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              name="city"
              value={form.city}
              onChange={onChange}
              required
              placeholder="City"
              className="w-full rounded border p-2"
            />
            <input
              name="zip"
              value={form.zip}
              onChange={onChange}
              required
              placeholder="ZIP"
              className="w-full rounded border p-2"
            />
          </div>

          <button
            type="submit"
            className="mt-2 rounded bg-black px-4 py-2 text-white"
          >
            Place order
          </button>
        </form>
      </section>

      <section className="rounded border p-4">
        <h2 className="mb-3 text-lg font-semibold">Order summary</h2>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between text-sm">
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 space-y-1 border-t pt-3 text-sm">
          <p className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-base font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </p>
        </div>
      </section>
    </main>
  );
}
