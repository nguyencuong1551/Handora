
export type Category = 'Hand Wash' | 'Skincare' | 'Refill' | 'Body Care';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  ingredients: string[];
  imageUrl: string;
  stock: number;
  featured?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface CartItem extends Product {
  quantity: number;
  subscription?: 'none' | 'monthly' | 'quarterly';
}

export interface UserQuizData {
  skinType: string;
  concerns: string[];
  sensitivity: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed';
  createdAt: string;
  customer: {
    name: string;
    email: string;
  };
}

export interface AppData {
  products: Product[];
  orders: Order[];
  blogs: BlogPost[];
  users: User[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}
