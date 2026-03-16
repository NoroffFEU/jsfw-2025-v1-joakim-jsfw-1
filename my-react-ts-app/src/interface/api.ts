interface Product {
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
  tags: Array<string>;
  reviews: Array<{
    id: string;
    username: string;
    rating: number;
    description: string;
  }>;
}

export interface CartItem extends Product {
  quantity: number;
}

export type { Product };
