import {BsFilterRight} from 'react-icons/bs'
import './index.css'

const ProductsHeader = props => {
  const {sortByOptions, activeOptionId} = props

  const onChangeSortBy = event => {
    const {changeSortBy} = props
    changeSortBy(event.target.value)
  }

  return (
    <div className="products-header-container">
      <h1 className="all-products-heading">All Products</h1>
      <div className="filter-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort by</p>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortBy}
        >
          {sortByOptions.map(eachOption => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductsHeader
