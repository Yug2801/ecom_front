type CollectionType = {
  _id: string;
  title: string;
  products: number;
  image: string;
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: string[];         // Changed [string] to string[] for clarity
  category: string;
  collections: string[];   // Changed [string] to string[]
  tags: string[];          // Changed [string] to string[]
  price: number;
  cost: number;
  sizes: string[];         // Changed [string] to string[]
  colors: string[];        // Changed [string] to string[]
  createdAt: string;
  updatedAt: string;
};

type UserType = {
  clerkId: string;
  wishlist: string[];      // Changed [string] to string[]
  createdAt: string;
  updatedAt: string;
};
type OrderType = {
  _id: string;
  customerClerkId: string;
  customerName: string;        // Added for the customer's name
  phoneNumber: string;        // Added optional phone number
  totalAmount: number;
  status: string;              // Added status field (pending, accepted, etc.)
  items: OrderItemType[];      // Renamed from `products` to `items`
  createdAt: string;
};

type OrderItemType = {
  _id: string;
  product: ProductType;
  color: string;
  size: string;
  quantity: number;
};
