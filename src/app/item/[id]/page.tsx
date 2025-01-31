'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

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
export default function ItemDetail() {
  const [item, setItem] = useState<Item | null>(null);
  const params = useParams();
  const itemId = params.id;

  useEffect(() => {
    const fetchItem = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/items/${itemId}`);
      const data = await response.json();
      setItem(data);
    };

    fetchItem();
  }, [itemId]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="row gx-4 gx-lg-5 align-items-center">
        <div className="col-md-6">
          {item.image ? (
            <img className="card-img-top mb-5 mb-md-0" src={item.image} alt={item.name} style={{
                maxWidth: '100%', // 追加
                maxHeight: '400px', // 追加
                objectFit: 'contain', // 追加
              }} />
          ) : (
            <img className="card-img-top mb-5 mb-md-0" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
          )}
        </div>
        <div className="col-md-6">
          <h1 className="display-5 fw-bolder">{item.name}</h1>
          <div className="fs-5 mb-5">
            <span>{item.price}円</span>
          </div>
          <p className="lead">{item.description}</p>
          <div className="d-flex">
            <form method="post" action="">
              <input type="hidden" name="item_pk" value={item.id} />
              <input
                className="form-control text-center me-3"
                type="number"
                name="quantity"
                defaultValue={1}
                style={{ maxWidth: '3rem' }}
              />
              <button className="btn btn-outline-dark flex-shrink-0" type="submit">
                <i className="bi-cart-fill me-1"></i>
                カートに追加
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
  
}