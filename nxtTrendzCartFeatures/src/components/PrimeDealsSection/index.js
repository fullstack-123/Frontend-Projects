import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ProductItem from '../ProductItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PrimeDealsSection extends Component {
  state = {primeDealsList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getPrimeDealsList()
  }

  getPrimeDealsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/prime-deals'
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
      const updatedData = fetchedData.prime_deals.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        rating: product.rating,
        imageUrl: product.image_url,
      }))
      this.setState({
        primeDealsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderPrimeDealsSection = () => {
    const {primeDealsList} = this.state
    return (
      <div className="prime-products-list-container">
        <h1 className="all-products-heading">Exclusive Prime Deals</h1>
        <ul className="prime-products-list">
          {primeDealsList.map(product => (
            <ProductItem productDetails={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderPrimeDealsFailureViewSection = () => (
    <div className="prime-deals-failure-view-section">
      <img
        src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
        alt="register prime"
        className="register-prime-img"
      />
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader" className="prime-products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderAllPrimeDealsSection = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPrimeDealsSection()
      case apiStatusConstants.failure:
        return this.renderPrimeDealsFailureViewSection()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderAllPrimeDealsSection()}</>
  }
}

export default PrimeDealsSection
