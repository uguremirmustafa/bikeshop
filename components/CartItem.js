import { useCart } from 'react-use-cart';
import Link from 'next/link';
export default function CartItem({ item }) {
  const { removeItem, updateItemQuantity } = useCart();
  const outOfStock = item.quantity >= 5;
  const handleIncrease = () => {
    if (!outOfStock) {
      updateItemQuantity(item.id, parseInt(item.quantity) + 1);
    }
  };
  const handleDecrease = () => {
    if (!item.quantity <= 1) {
      updateItemQuantity(item.id, parseInt(item.quantity) - 1);
    }
  };
  return (
    <div className="cartItem">
      <div className="itemDetails">
        <Link href={`/product/${item.slug}`}>
          <h3>{item.name}</h3>
        </Link>
        <img src={item.image} />
        <span className="price">{item.price}$</span>
        <div className="qty">
          <button className="btn" onClick={handleDecrease} disabled={item.quantity <= 1}>
            -
          </button>
          <span>{item.quantity}</span>
          <button className="btn" onClick={handleIncrease} disabled={outOfStock}>
            +
          </button>
        </div>
      </div>
      <button className="trashIcon btn" onClick={() => removeItem(item.id)}>
        <svg viewBox="0 0 24 24" width="16" height="16" style={{ fill: '#fff' }}>
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z" />
        </svg>
      </button>
    </div>
  );
}
