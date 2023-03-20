import {BsSearch} from 'react-icons/bs'
import './index.css'

const FiltersGroup = props => {
  const renderRatingsFiltersList = () => {
    const {ratingsList} = props

    return ratingsList.map(rating => {
      const {activeRatingId, changeRating} = props

      const onChangeRating = () => changeRating(rating.ratingId)

      const activeRatingClassName =
        activeRatingId === rating.ratingId ? 'and-up active-rating' : 'and-up'

      return (
        <li
          className="ratings-list-item"
          key={rating.ratingId}
          onClick={onChangeRating}
        >
          <img
            src={rating.imageUrl}
            alt={`rating ${rating.ratingId}`}
            className="rating-img"
          />
          <p className={activeRatingClassName}>& up</p>
        </li>
      )
    })
  }

  const renderRatingsFilters = () => (
    <div>
      <h1 className="ratings-heading">Ratings</h1>
      <ul className="ratings-container">{renderRatingsFiltersList()}</ul>
    </div>
  )

  const renderCategoriesFiltersList = () => {
    const {categoryOptions} = props

    return categoryOptions.map(category => {
      const {changeCategory, activeCategoryId} = props

      const onChangeCategory = () => changeCategory(category.categoryId)

      const isActive = activeCategoryId === category.categoryId
      console.log(isActive)
      const activeCategoryClassName = isActive
        ? 'category-item active-category-item'
        : 'category-item'

      return (
        <li
          className="category-list-item"
          key={category.categoryId}
          onClick={onChangeCategory}
        >
          <p className={activeCategoryClassName}>{category.name}</p>
        </li>
      )
    })
  }

  const renderCategoriesFilters = () => (
    <div>
      <h1 className="categories-heading">Category</h1>
      <ul className="categories-container">{renderCategoriesFiltersList()}</ul>
    </div>
  )

  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const renderSearchInput = () => {
    const {searchInput} = props
    return (
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
          value={searchInput}
        />
        <BsSearch className="search-icon" />
      </div>
    )
  }

  const {clearFilters} = props

  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      {renderCategoriesFilters()}
      {renderRatingsFilters()}
      <button
        type="button"
        className="clear-filters-btn"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
