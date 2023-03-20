import './index.css'

const SimilarProductItem = props => {
  const {similarProductItemDetails} = props
  const {imageUrl, title, brand, rating, price, id} = similarProductItemDetails

  return (
    <li className="similar-product-list-item" key={id}>
      <img
        src={imageUrl}
        className="similar-product-img"
        alt={`similar product ${title}`}
      />
      <h1 className="similar-product-title">{title}</h1>
      <p className="similar-product-brand">{brand}</p>
      <div className="similar-product-price-rating-container">
        <h1 className="similar-product-price">Rs {price}/- </h1>
        <div className="similar-product-rating-container">
          <p className="similar-product-rating">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star-img"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
