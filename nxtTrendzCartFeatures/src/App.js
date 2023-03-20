import {Component} from 'react'
import {Route, BrowserRouter, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'
import Products from './components/Products'
import Cart from './components/Cart'
import Home from './components/Home'
import ProductItemDetails from './components/ProductItemDetails'
import CartContext from './Context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

class App extends Component {
  state = {cartList: []}

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item => {
        if (item.id === id) {
          return {...item, quantity: item.quantity + 1}
        }
        return {...item}
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productItem = cartList.find(product => product.id === id)

    if (productItem.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(product => {
          if (product.id === id) {
            return {...product, quantity: product.quantity - 1}
          }
          return {...product}
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productItem = cartList.find(item => item.id === product.id)

    if (productItem) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item => {
          if (item.id === product.id) {
            return {...item, quantity: item.quantity + product.quantity}
          }
          return {...item}
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(cartItem => cartItem.id !== id)
    this.setState({cartList: filteredList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            removeCartItem: this.removeCartItem,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
            removeAllCartItems: this.removeAllCartItems,
          }}
        >
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/products/:id" component={ProductItemDetails} />
            <Route component={NotFound} />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}
export default App
