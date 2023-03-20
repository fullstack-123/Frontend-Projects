import CartItem from '../CartItem'
import CartContext from '../../Context/CartContext'
import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      return (
        <ul className="cart-list">
          {cartList.map(cartItem => (
            <CartItem cartItemDetails={cartItem} key={cartItem.id} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
