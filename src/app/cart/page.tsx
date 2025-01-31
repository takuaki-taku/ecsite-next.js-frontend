'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

interface CartItem {
  id: number;
  item: Item;
  quantity: number;
}

interface Cart {
  cart_items: CartItem[];
  total_price: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      // TODO: ユーザーIDを取得してカート情報を取得する
      const response = await fetch('http://127.0.0.1:8000/api/cart/1');
      const data = await response.json();
      setCart(data);
    };

    fetchCart();
  }, []);

  if (!cart) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mx-auto" style={{ maxWidth: '960px' }}>
        {cart.cart_items && cart.cart_items.length > 0 ? (
          <>
            <table className="table align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th scope="col">商品名</th>
                  <th scope="col">単価</th>
                  <th scope="col">購入数</th>
                  <th scope="col">合計</th>
                </tr>
              </thead>
              <tbody>
                {cart.cart_items.map((cartItem) => (
                  <tr key={cartItem.id}>
                    <td>{cartItem.item.name}</td>
                    <td>{cartItem.item.price}円</td>
                    <td>{cartItem.quantity}</td>
                    <td>{cartItem.item.price * cartItem.quantity}円</td>
                    <td>
                      <form method="post" action="">
                        <input type="hidden" name="cart_item_pk" value={cartItem.id} />
                        <button type="submit" className="btn btn-danger">削除</button>
                      </form>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="text-end fw-bolder fs-5" colSpan={4}>
                    総額：{cart.total_price}円
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-center">
              <form method="post" action="">
                <Link href="/" className="btn btn-secondary">
                  ショッピングを続ける
                </Link>
                <button type="submit" className="btn btn-dark">
                  購入へ進む
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p>カートは空です。</p>
            <Link href="/" className="btn btn-secondary">
              商品を探す
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}