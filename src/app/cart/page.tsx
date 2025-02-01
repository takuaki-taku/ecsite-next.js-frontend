"use client"
import { useState, useEffect } from 'react';
import fetchWithToken from '@/app/utils/api';

interface CartItem {
  id: number;
  item: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
}

interface Cart {
  id: number;
  cart_items: CartItem[];
  total_price: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    setIsLoggedIn(!!accessToken);
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (isLoggedIn) {
          // ユーザーIDを取得する処理を追加
          const accessToken = localStorage.getItem('access_token');
          if (accessToken) {
            const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
            const userId = tokenPayload.user_id;
            const data = await fetchWithToken(`http://localhost:8000/api/cart/${userId}/`);
            setCart(data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }
    };

    fetchCart();
  }, [isLoggedIn]);

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
          </>
        ) : (
          <p>カートに商品はありません。</p>
        )}
      </div>
    </main>
  );
}