export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'customer' | 'farmer' | 'meat_seller';
  avatar_url?: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'live_animal' | 'cut_meat';
  subcategory: string;
  images: string[];
  seller_id: string;
  seller: User;
  stock_quantity: number;
  weight?: number;
  weight_unit?: 'kg' | 'lbs';
  breed?: string;
  age_months?: number;
  certifications?: string[];
  is_available: boolean;
  rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  product_id: string;
  product: Product;
  quantity: number;
  user_id: string;
}

export interface Order {
  id: string;
  user_id: string;
  user: User;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  shipping_address: string;
  payment_method: string;
  payment_status: 'pending' | 'paid' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user: User;
  rating: number;
  comment: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}