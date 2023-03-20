import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import SimilarProductItem from '../SimilarProductItem'
import CartContext from '../../Context/CartContext'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    productItemDetails: {},
    similarProducts: [],
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
  }

  componentDidMount() {
    this.getProductItemDetails()
  }

  getProductItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = {
        id: fetchedData.id,
        availability: fetchedData.availability,
        imageUrl: fetchedData.image_url,
        title: fetchedData.title,
        brand: fetchedData.brand,
        totalReviews: fetchedData.total_reviews,
        rating: fetchedData.rating,
        price: fetchedData.price,
        description: fetchedData.description,
      }
      const similarProducts = fetchedData.similar_products

      const updatedSimilarProducts = similarProducts.map(product => ({
        id: product.id,
        availability: product.availability,
        imageUrl: product.image_url,
        title: product.title,
        brand: product.brand,
        totalReviews: product.total_reviews,
        rating: product.rating,
        price: product.price,
        description: product.description,
      }))

      this.setState({
        productItemDetails: updatedData,
        similarProducts: updatedSimilarProducts,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickIncrement = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onClickDecrement = () => {
    this.setState(prevState => {
      if (prevState.quantity > 1) {
        return {quantity: prevState.quantity - 1}
      }
      return {quantity: 1}
    })
  }

  renderProductItemDetails = () => (
    <CartContext.Consumer>
      {value => {
        const {productItemDetails, similarProducts, quantity} = this.state
        const {
          availability,
          imageUrl,
          title,
          brand,
          totalReviews,
          rating,
          description,
          price,
        } = productItemDetails

        const {addCartItem} = value

        const onClickAddToCart = () => {
          addCartItem({...productItemDetails, quantity})
        }

        return (
          <>
            <Header />
            <div className="product-item-details-container">
              <img
                src={imageUrl}
                alt="product"
                className="product-details-img"
              />
              <div className="right-container">
                <h1 className="pd-title-heading">{title}</h1>
                <div className="pd-price-rating-container">
                  <h1 className="pd-price">Rs {price}/- </h1>
                  <div className="pd-rating-container">
                    <div className="pd-rating-star-container">
                      <p className="rating">{rating}</p>
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                        alt="star"
                        className="star-img"
                      />
                    </div>
                    <p className="reviews-count">{totalReviews} Reviews</p>
                  </div>
                </div>
                <p className="pd-description">{description}</p>

                <div className="label-value-container">
                  <p className="label">Available: </p>
                  <p className="value">{availability}</p>
                </div>

                <div className="label-value-container">
                  <p className="label">Brand: </p>
                  <p className="value">{brand}</p>
                </div>
                <div className="hr-container">
                  <hr className="horizontal-line" />
                </div>
                <div className="buttons-container">
                  <button
                    type="button"
                    className="minus-btn"
                    onClick={this.onClickDecrement}
                  >
                    <BsDashSquare className="quantity-controller-icon" />
                  </button>
                  <p className="quantity">{quantity}</p>
                  <button
                    type="button"
                    className="plus-btn"
                    onClick={this.onClickIncrement}
                  >
                    <BsPlusSquare className="quantity-controller-icon" />
                  </button>
                </div>
                <button
                  type="button"
                  className="add-to-cart-btn"
                  onClick={onClickAddToCart}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
            <div className="similar-products-container">
              <h1 className="similar-products-heading">Similar Products</h1>
              <ul className="similar-products-items-container">
                {similarProducts.map(product => (
                  <SimilarProductItem
                    similarProductItemDetails={product}
                    key={product.id}
                  />
                ))}
              </ul>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )

  renderProductItemDetailsFailureView = () => (
    <>
      <Header />
      <div className="product-item-details-failure-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          className="product-error-view-img"
          alt="error view"
        />
        <h1 className="product-not-found-heading">Product Not Found</h1>
        <button type="button" className="cont-shop-btn">
          Continue Shopping
        </button>
      </div>
    </>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="details-loader-view-container">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderAllProductsDetailsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductItemDetails()
      case apiStatusConstants.failure:
        return this.renderProductItemDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderAllProductsDetailsView()}</div>
  }
}

export default ProductItemDetails
