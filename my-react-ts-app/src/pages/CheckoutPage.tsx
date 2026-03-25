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

type FieldErrors = Partial<Record<keyof CheckoutPageProps, string>>;

const validateForm = (values: CheckoutPageProps): FieldErrors => {
  const errors: FieldErrors = {};

  if (values.fullName.trim().length < 3)
    errors.fullName = "Please enter your full name (at least 3 characters).";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Please enter a valid email address.";

  if (values.address.trim().length < 5)
    errors.address = "Please enter a valid address.";

  if (values.city.trim().length < 2)
    errors.city = "Please enter city name (at least 2 characters).";

  if (!/^\d{4,}$/.test(values.zip.trim()))
    errors.zip = "ZIP code must be 4-10 digits.";

  return errors;
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const items = useShoppingCart((s) => s.items);
  const clearCart = useShoppingCart((s) => s.clearCart);

  const [cardType, setCardType] = useState<"visa" | "mastercard">("visa");
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });

  const onCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCard((prev) => ({ ...prev, [name]: value }));
  };

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({
      ...prev,
      [name as keyof CheckoutPageProps]: "",
    }));
    if (submitError) setSubmitError("");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (items.length === 0) {
      setSubmitError("Your cart is empty.");
      return;
    }

    const errors = validateForm(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 700)); // simulate async call
      clearCart();
      navigate("/checkout/success", { replace: true });
    } catch {
      setSubmitError("Could not complete checkout. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
          {submitError && (
            <p className="rounded border border-red-300 bg-red-50 p-2 text-sm text-red-700">
              {submitError}
            </p>
          )}

          <input
            name="fullName"
            value={form.fullName}
            onChange={onChange}
            placeholder="Full name"
            className="w-full rounded border p-2"
            aria-invalid={!!fieldErrors.fullName}
          />
          {fieldErrors.fullName && (
            <p className="text-sm text-red-600">{fieldErrors.fullName}</p>
          )}

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email"
            className="w-full rounded border p-2"
            aria-invalid={!!fieldErrors.email}
          />
          {fieldErrors.email && (
            <p className="text-sm text-red-600">{fieldErrors.email}</p>
          )}

          <input
            name="address"
            value={form.address}
            onChange={onChange}
            placeholder="Address"
            className="w-full rounded border p-2"
            aria-invalid={!!fieldErrors.address}
          />
          {fieldErrors.address && (
            <p className="text-sm text-red-600">{fieldErrors.address}</p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                name="city"
                value={form.city}
                onChange={onChange}
                placeholder="City"
                className="w-full rounded border p-2"
                aria-invalid={!!fieldErrors.city}
              />
              {fieldErrors.city && (
                <p className="text-sm text-red-600">{fieldErrors.city}</p>
              )}
            </div>
            <div>
              <input
                name="zip"
                value={form.zip}
                onChange={onChange}
                placeholder="ZIP"
                className="w-full rounded border p-2"
                aria-invalid={!!fieldErrors.zip}
              />
              {fieldErrors.zip && (
                <p className="text-sm text-red-600">{fieldErrors.zip}</p>
              )}
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <h2 className="font-semibold text-base">Payment</h2>

            <div className="flex rounded border overflow-hidden w-fit">
              <button
                type="button"
                onClick={() => setCardType("visa")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  cardType === "visa"
                    ? "bg-[#812a00] cursor-pointer hover:bg-[#8f4b2a] transition-colors text-white"
                    : "bg-white text-gray-600 hover:bg-gray-200 cursor-pointer"
                }`}
              >
                Debit card
              </button>
              <button
                type="button"
                onClick={() => setCardType("mastercard")}
                className={`px-4 py-2 text-sm font-medium transition-colors border-l ${
                  cardType === "mastercard"
                    ? "bg-[#812a00] cursor-pointer hover:bg-[#8f4b2a] transition-colors text-white"
                    : "bg-white text-gray-600 hover:bg-gray-200 cursor-pointer"
                }`}
              >
                Credit card
              </button>
            </div>

            <input
              name="number"
              value={card.number}
              onChange={onCardChange}
              placeholder="Card number"
              maxLength={19}
              className="w-full rounded border p-2"
            />

            <input
              name="name"
              value={card.name}
              onChange={onCardChange}
              placeholder="Name on card"
              className="w-full rounded border p-2"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                name="expiry"
                value={card.expiry}
                onChange={onCardChange}
                placeholder="MM / YY"
                maxLength={7}
                className="w-full rounded border p-2"
              />
              <input
                name="cvv"
                value={card.cvc}
                onChange={onCardChange}
                placeholder="CVV"
                maxLength={4}
                className="w-full rounded border p-2"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded bg-[#812a00] px-4 py-2 text-white disabled:opacity-50 cursor-pointer hover:bg-[#8f4b2a] transition-colors"
          >
            {isSubmitting ? "Placing order..." : "Place order"}
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
