import {Link} from 'react-router-dom'
import './index.css'

const EmptyCartView = () => (
  <div className="empty-cart-view-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
      alt="cart empty"
      className="empty-cart-img"
    />
    <h1 className="empty-cart-heading">Your Cart Is Empty</h1>
    <Link to="/products">
      <button type="button" className="shop-now-cart-btn">
        Shop Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
