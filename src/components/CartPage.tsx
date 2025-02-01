export default function CartPage() {
    const [cart, setCart] = useState<Cart | null>(null);
   
  
    useEffect(() => {
      const fetchCart = async () => {
        try {
          // ログインしている場合のみカート情報を取得
          if (isLoggedIn) {
            const data = await fetchWithToken('http://localhost:8000/api/cart/1/');
            setCart(data);
          }
        } catch (error) {
          console.error('Failed to fetch cart:', error);
        }
      };
  
      fetchCart();
    }, [isLoggedIn]);