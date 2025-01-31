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

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <div className="col mb-5">
      <div className="card h-100">
        <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>{item.category.name}</div>
        {item.image ? (
        <img
            className="card-img-top"
            src={item.image}
            alt={item.name}
            style={{
            height: '150px',
            objectFit: 'contain',
            maxWidth: '100%', // 追加
            }}
        />
        ) : (
          <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
        )}
        <div className="card-body p-4">
          <div className="text-center">
            <h5 className="fw-bolder">{item.name}</h5>
            <p>{item.price}円</p>
          </div>
        </div>
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
          <Link href={`/item/${item.id}`} className="btn btn-outline-dark mt-auto">詳細を見る</Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;