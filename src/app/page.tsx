'use client';

import { useState, useEffect } from 'react';
import ItemCard from '@/components/ItemCard';

interface Category {
  id: number;
  name: string;
}

interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string | null;
  category: Category;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/items/');
      const data = await response.json();
      setItems(data);
    };

    const fetchCategories = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/categories/');
      const data = await response.json();
      setCategories(data);
    };

    fetchItems();
    fetchCategories();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
        {items.length > 0 ? (
          items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))
        ) : (
          <p>商品がありません。</p>
        )}
      </div>
    </main>
  );
}