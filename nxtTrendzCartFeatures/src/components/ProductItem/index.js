import {Link} from 'react-router-dom'
import './index.css'

const ProductItem = props => {
  const {productDetails} = props
  const {title, price, rating, id, imageUrl, brand} = productDetails

  return (
    <Link to={`/products/${id}`} className="product-link-item">
      <li className="product-list-item" key={id}>
        <img src={imageUrl} alt="product" className="product-img" />
        <h1 className="title">{title}</h1>
        <p className="brand">{brand}</p>
        <div className="price-rating-container">
          <h1 className="price">Rs {price}/- </h1>
          <div className="rating-container">
            <p className="rating">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star-img"
            />
          </div>
        </div>
      </li>
    </Link>
  )
}

export default ProductItem
