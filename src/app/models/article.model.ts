export interface Article {
  id: string;
  title: string;
  description: string;
  price: number;
  images: {
    small: string;
    medium: string;
    large: string;
  }[];
  seller: {
    name: string;
    location: string;
    rating: number;
  };
  paymentMethods: {
    type: string;
    banck: string;
    dues: number;
    image: string;
    imageBanck:string;
  }[];
  rating: number;
  reviews: {
    stars: number;
    message: string;
  }[];
  stock: number;
}