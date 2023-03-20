import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import FiltersGroup from '../FiltersGroup'
import Header from '../Header'

import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiProfileStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    profileDetails: {},
    employmentTypeId: '',
    empTypeList: [],
    salaryRangeId: '',
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    apiProfileStatus: apiProfileStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsList()
  }

  getProfileDetails = async () => {
    this.setState({apiProfileStatus: apiProfileStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/profile`
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
      const profileDetails = fetchedData.profile_details
      const updatedData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        apiProfileStatus: apiProfileStatusConstants.success,
      })
    } else if (response.status === 400) {
      this.setState({apiProfileStatus: apiProfileStatusConstants.failure})
    }
  }

  renderProfileDetails = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="render-profile-details-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-name">{name}</h1>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {salaryRangeId, empTypeList, searchInput} = this.state

    console.log(searchInput)

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${empTypeList.join(
      ',',
    )}&minimum_package=${salaryRangeId}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.status === 200) {
      const data = await response.json()
      const formattedData = data.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 400) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeEmpTypeId = employmentTypeId => {
    this.setState(prevState => {
      if (!prevState.empTypeList.includes(employmentTypeId)) {
        return {
          empTypeList: [...prevState.empTypeList, employmentTypeId],
          employmentTypeId,
        }
      }
      return {empTypeList: [...prevState.empTypeList]}
    }, this.getJobsList)
  }

  changeSalaryRangeId = salaryRangeId => {
    this.setState({salaryRangeId}, this.getJobsList)
  }

  onClickSearchButton = () => {
    this.getJobsList()
    const {jobsList, searchInput} = this.state

    const filteredList = jobsList.filter(job =>
      job.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    this.setState({jobsList: filteredList, searchInput: ''})
  }

  onClickChangeItem = event => {
    if (event.key === 'Enter') {
      this.onClickSearchButton()
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  jobsFailureRetry = () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    this.getJobsList()
  }

  profileFailureRetry = () => {
    this.setState({apiProfileStatus: apiProfileStatusConstants.inProgress})
    this.getProfileDetails()
  }

  renderJobsListFailureView = () => (
    <div className="jobs-list-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-view-img"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="jobs-retry-btn"
        onClick={this.jobsFailureRetry}
      >
        Retry
      </button>
    </div>
  )

  renderNoProductsView = () => (
    <div className="no-jobs-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderProfileDetailsFailureView = () => (
    <div className="profile-details-failure-view-container">
      <button
        type="button"
        className="profile-profile-btn"
        onClick={this.profileFailureRetry}
      >
        Retry
      </button>
    </div>
  )

  renderSearchInput = () => {
    const {searchInput} = this.state
    console.log(searchInput)
    return (
      <div className="search-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          value={searchInput}
          onKeyDown={this.onClickChangeItem}
        />
        <div className="search-icon-container">
          <button
            type="button"
            className="search-btn"
            onClick={this.onClickSearchButton}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
      </div>
    )
  }

  renderJobsList = () => {
    const {jobsList} = this.state

    const shouldShowJobs = jobsList.length > 0

    return (
      <ul className="jobs-list-container">
        {shouldShowJobs ? (
          jobsList.map(jobItem => (
            <JobItem jobItemDetails={jobItem} key={jobItem.id} />
          ))
        ) : (
          <div className="no-jobs-view">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-jobs-img"
            />
            <h1 className="no-jobs-heading">No Jobs Found</h1>
            <p className="no-jobs-description">
              We could not find any jobs. Try other filters.
            </p>
          </div>
        )}
      </ul>
    )
  }

  renderJobsLoader = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileLoader = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return this.renderJobsListFailureView()
      case apiStatusConstants.inProgress:
        return this.renderJobsLoader()
      default:
        return null
    }
  }

  renderProfile = () => {
    const {apiProfileStatus} = this.state

    switch (apiProfileStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDetails()
      case apiStatusConstants.failure:
        return this.renderProfileDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderProfileLoader()
      default:
        return null
    }
  }

  render() {
    const {employmentTypeId, salaryRangeId} = this.state

    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="jobs-container">
            <div className="jobs-left-container">
              {this.renderProfile()}
              <FiltersGroup
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
                employmentTypeId={employmentTypeId}
                salaryRangeId={salaryRangeId}
                changeEmpTypeId={this.changeEmpTypeId}
                changeSalaryRangeId={this.changeSalaryRangeId}
              />
            </div>
            <div className="jobs-right-container">
              {this.renderSearchInput()}
              {this.renderJobs()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
