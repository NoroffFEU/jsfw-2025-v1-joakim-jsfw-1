import { useEffect, useState, type ComponentProps } from "react";
import { StoreItem } from "../components/StoreItem";
import AutocompleteSearchBar from "../interface/AutocomplettSearchBar";

type StoreItemData = ComponentProps<typeof StoreItem>;

type ApiReview = {
  id?: string | number;
  username?: string;
  rating?: number;
  description?: string;
};

type ApiProduct = {
  id: string | number;
  title?: string;
  name?: string;
  description?: string;
  price?: number;
  discountedPrice?: number;
  image?: { url?: string; alt?: string } | string;
  imageUrl?: string;
  rating?: number;
  tags?: string[];
  reviews?: ApiReview[];
};

type ApiResponse = ApiProduct[] | { data: ApiProduct[] };

export default function HomePage() {
  const [products, setProducts] = useState<StoreItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("https://v2.api.noroff.dev/online-shop/");
        if (!res.ok) throw new Error("Failed to fetch products");

        const json = (await res.json()) as ApiResponse;
        const raw = Array.isArray(json) ? json : json.data;
        if (!Array.isArray(raw)) throw new Error("Unexpected API format");

        const mapped: StoreItemData[] = raw.map((p) => {
          const title = p.title ?? p.name ?? "Untitled";

          const imageUrl =
            typeof p.image === "string"
              ? p.image
              : (p.image?.url ?? p.imageUrl ?? "");

          const imageAlt =
            typeof p.image === "object" && p.image?.alt ? p.image.alt : title;

          return {
            id: String(p.id),
            title,
            description: p.description ?? "",
            price: Number(p.price ?? 0),
            discountedPrice: Number(p.discountedPrice ?? p.price ?? 0),
            image: {
              url: imageUrl,
              alt: imageAlt,
            },
            rating: Number(p.rating ?? 0),
            tags: Array.isArray(p.tags) ? p.tags : [],
            reviews: Array.isArray(p.reviews)
              ? p.reviews.map((r, index) => ({
                  id: String(r.id ?? `${p.id}-review-${index}`),
                  username: r.username ?? "Anonymous",
                  rating: Number(r.rating ?? 0),
                  description: r.description ?? "",
                }))
              : [],
          };
        });

        setProducts(mapped);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <>
      <AutocompleteSearchBar />
      <main className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col">
            <StoreItem {...product} />
          </div>
        ))}
      </main>
    </>
  );
}
