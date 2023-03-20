import './index.css'

const FiltersGroup = props => {
  const renderEmpTypeList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(empTypeItem => {
      const {changeEmpTypeId} = props

      const onClickChangeEmpTypeId = () => {
        changeEmpTypeId(empTypeItem.employmentTypeId)
      }

      return (
        <li
          className="emp-list-item"
          key={empTypeItem.employmentTypeId}
          onClick={onClickChangeEmpTypeId}
        >
          <input
            type="checkbox"
            className="check-box"
            id={`checkbox ${empTypeItem.employmentTypeId}`}
          />
          <label
            className="emp-label"
            htmlFor={`checkbox ${empTypeItem.employmentTypeId}`}
          >
            {empTypeItem.label}
          </label>
        </li>
      )
    })
  }

  const renderEmpTypeFilters = () => (
    <>
      <hr className="horizontal-line" />
      <h1 className="emp-heading">Type of Employment</h1>
      <ul className="emp-list-items">{renderEmpTypeList()}</ul>
    </>
  )

  const renderSalaryRangeList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(salaryItem => {
      const {changeSalaryRangeId} = props

      const onClickChangeSalaryRange = () =>
        changeSalaryRangeId(salaryItem.salaryRangeId)

      return (
        <li
          className="salary-list-item"
          key={salaryItem.salaryRangeId}
          onClick={onClickChangeSalaryRange}
        >
          <input
            type="radio"
            className="radio"
            name="salary"
            id={`radio ${salaryItem.salaryRangeId}`}
          />
          <label
            htmlFor={`radio ${salaryItem.salaryRangeId}`}
            className="salary-label"
          >
            {salaryItem.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRangeFilters = () => (
    <>
      <hr className="horizontal-line" />
      <h1 className="salary-heading">Salary Range</h1>
      <ul className="salary-list-items">{renderSalaryRangeList()}</ul>
    </>
  )

  return (
    <div className="filters-group-container">
      {renderEmpTypeFilters()}
      {renderSalaryRangeFilters()}
    </div>
  )
}

export default FiltersGroup
