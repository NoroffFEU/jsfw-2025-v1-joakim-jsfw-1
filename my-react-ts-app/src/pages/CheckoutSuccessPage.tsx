import { Link } from "react-router-dom";

export default function CheckoutSuccessPage() {
  return (
    <main className="mx-auto max-w-lg p-6 text-center mt-16">
      <div className="mb-4 text-5xl">🎉</div>
      <h1 className="text-2xl font-bold mb-2">Order placed!</h1>
      <p className="text-white mb-6">
        Thanks for your purchase. You'll receive a confirmation email shortly.
      </p>
      <Link
        to="/"
        className="rounded bg-[#812a00] px-6 py-3 text-white font-medium hover:bg-[#8f4b2a] transition-colors"
      >
        Continue shopping
      </Link>
    </main>
  );
}
