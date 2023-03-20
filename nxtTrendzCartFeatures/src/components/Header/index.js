// Write your JS code here
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../../Context/CartContext'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        const cartListCount = () => {
          if (cartList.length > 0) {
            return (
              <div className="cart-count-container">
                <p className="cart-list-count">{cartList.length}</p>
              </div>
            )
          }
          return null
        }

        return (
          <nav className="nav-container">
            <div className="nav-items-container">
              <div className="nav-bar-mobile-logo-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                  alt="website logo"
                  className="website-mobile-logo-img"
                />
                <button type="button" className="logout-mobile-btn">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                    alt="nav logout"
                    className="nav-bar-logout-image"
                  />
                </button>
              </div>

              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                alt="website logo"
                className="website-logo-desktop-img"
              />
              <ul className="nav-menu-container">
                <Link to="/" className="link-item">
                  <li className="nav-menu-item">Home</li>
                </Link>
                <Link to="/products" className="link-item">
                  <li className="nav-menu-item">Products</li>
                </Link>
                <Link to="/cart" className="link-item">
                  <li className="nav-menu-item">Cart</li>
                </Link>
                {cartListCount()}
              </ul>
              <button
                type="button"
                className="logout-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
              <div className="navbar-mobile-menu-container">
                <ul className="navbar-mobile-menu-items-container">
                  <Link to="/" className="nav-link-item">
                    <li className="nav-menu-item-mobile">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                        alt="nav home"
                        className="nav-bar-home-img"
                      />
                    </li>
                  </Link>

                  <Link to="/products" className="nav-link-item">
                    <li className="nav-menu-item-mobile">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                        alt="nav products"
                        className="nav-bar-home-img"
                      />
                    </li>
                  </Link>

                  <Link to="/cart" className="nav-link-item">
                    <li className="nav-menu-item-mobile">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                        alt="nav cart"
                        className="nav-bar-home-img"
                      />
                    </li>
                  </Link>
                  {cartListCount()}
                </ul>
              </div>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}
export default withRouter(Header)
