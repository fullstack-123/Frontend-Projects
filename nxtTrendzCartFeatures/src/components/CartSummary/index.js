// Write your code here

import CartContext from '../../Context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      let total = 0

      cartList.forEach(item => {
        total += item.quantity * item.price
      })

      return (
        <div className="cart-summary-container">
          <h1 className="order-total">
            Order Total: <span className="total-rs">Rs {total}/- </span>
          </h1>
          <p className="items-in-cart">{cartList.length} items in cart</p>
          <button type="button" className="check-out-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
