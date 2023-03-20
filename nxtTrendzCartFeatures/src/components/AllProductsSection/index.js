import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ProductItem from '../ProductItem'
import FiltersGroup from '../FiltersGroup'
import ProductsHeader from '../ProductsHeader'
import './index.css'

const sortByOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: 1,
  },
  {
    name: 'Electronics',
    categoryId: 2,
  },
  {
    name: 'Appliances',
    categoryId: 3,
  },
  {
    name: 'Grocery',
    categoryId: 4,
  },
  {
    name: 'Toys',
    categoryId: 5,
  },
]

const ratingsList = [
  {
    ratingId: 4,
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: 3,
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: 2,
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: 1,
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    apiStatus: apiStatusConstants.initial,
    activeOptionId: sortByOptions[1].optionId,
    activeCategoryId: '',
    activeRatingId: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getProductsList()
  }

  getProductsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {
      activeOptionId,
      activeRatingId,
      searchInput,
      activeCategoryId,
    } = this.state

    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`

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
      const updatedList = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        rating: product.rating,
        id: product.id,
        imageUrl: product.image_url,
        price: product.price,
      }))

      this.setState({
        productsList: updatedList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeSortBy = activeOptionId => {
    this.setState({activeOptionId}, this.getProductsList)
  }

  changeRating = activeRatingId => {
    this.setState({activeRatingId}, this.getProductsList)
  }

  changeCategory = activeCategoryId => {
    this.setState({activeCategoryId}, this.getProductsList)
  }

  enterSearchInput = () => {
    this.getProductsList()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput}, this.getProducts)
  }

  clearFilters = () => {
    this.setState(
      {activeCategoryId: '', activeRatingId: '', searchInput: ''},
      this.getProductsList,
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    const shouldShowProductsList = productsList.length > 0

    return shouldShowProductsList ? (
      <div className="products-list-container">
        <ProductsHeader
          sortByOptions={sortByOptions}
          activeOptionId={activeOptionId}
          changeSortBy={this.changeSortBy}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductItem productDetails={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          alt="no products"
          className="no-products-img"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p className="no-products-description">
          We could not find any products. Try other filters.
        </p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        className="products-failure-img"
        alt="products failure"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {activeCategoryId, activeRatingId, searchInput} = this.state

    return (
      <div className="all-products-container">
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          activeCategoryId={activeCategoryId}
          activeRatingId={activeRatingId}
          searchInput={searchInput}
          changeRating={this.changeRating}
          changeCategory={this.changeCategory}
          changeSearchInput={this.changeSearchInput}
          enterSearchInput={this.enterSearchInput}
          clearFilters={this.clearFilters}
        />
        {this.renderAllProducts()}
      </div>
    )
  }
}

export default AllProductsSection
