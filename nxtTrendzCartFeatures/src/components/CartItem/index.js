import {AiFillCloseCircle} from 'react-icons/ai'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import CartContext from '../../Context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value

      const {cartItemDetails} = props
      const {title, brand, imageUrl, price, id, quantity} = cartItemDetails

      const onClickRemoveCartItem = () => {
        removeCartItem(id)
      }

      const onClickIncrementQuantity = () => {
        incrementCartItemQuantity(id)
      }

      const onClickDecrementQuantity = () => {
        decrementCartItemQuantity(id)
      }

      return (
        <div className="cart-list-item" key={id}>
          <img src={imageUrl} alt={title} className="cart-list-img" />
          <div className="cart-item-details-container">
            <div className="cart-title-brand-container">
              <h1 className="cart-title">{title}</h1>
              <p className="cart-brand">{brand}</p>
            </div>
            <div className="button-container">
              <button
                type="button"
                className="minus-btn"
                onClick={onClickDecrementQuantity}
              >
                <BsDashSquare className="quantity-controller-icon" />
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="plus-btn"
                onClick={onClickIncrementQuantity}
              >
                <BsPlusSquare className="quantity-controller-icon" />
              </button>
            </div>
            <div className="price-delete-container">
              <p className="cart-item-total-price">Rs {price * quantity}/- </p>
              <button
                type="button"
                className="cart-item-delete-btn"
                onClick={onClickRemoveCartItem}
              >
                <AiFillCloseCircle className="delete-btn" />
              </button>
            </div>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
