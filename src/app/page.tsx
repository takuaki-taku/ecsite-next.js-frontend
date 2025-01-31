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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);


  useEffect(() => {
    const fetchItems = async () => {
      let url = 'http://127.0.0.1:8000/api/items/';
      if (selectedCategory) {
        const params = new URLSearchParams({ category: selectedCategory });
        url += `?${params.toString()}`;
      }
      const response = await fetch(url);
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
  }, [searchTrigger]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value === '' ? null : e.target.value);
  };

  const handleSearch = () => {
    setSearchTrigger(!searchTrigger);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mx-auto text-center mb-5" style={{ maxWidth: '300px' }}>
        <p>カテゴリを絞って商品を検索↓</p>
        <div className="row">
          <div className="col-8">
            <select
              className="form-select"
              onChange={handleCategoryChange}
              value={selectedCategory || ''}
            >
              <option value="">選択してください</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-4">
            <button type="submit" className="btn btn-outline-secondary" onClick={handleSearch}><i className="bi bi-search me-1"></i>検索</button>
          </div>
        </div>
      </div>
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