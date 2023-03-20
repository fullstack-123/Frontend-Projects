import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {HiExternalLink} from 'react-icons/hi'
import Header from '../Header'
import SkillItem from '../SkillItem'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    skillsList: [],
    lifeAtCompany: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.status === 200) {
      const data = await response.json()

      const jobDetails = data.job_details
      const similarJobs = data.similar_jobs
      const lifeAtCompany = jobDetails.life_at_company
      const skillsList = data.job_details.skills

      const formattedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
      }

      const updatedSimilarJobs = similarJobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        rating: job.rating,
        title: job.title,
      }))

      const updatedLifeAtCompany = {
        description: lifeAtCompany.description,
        imageUrl: lifeAtCompany.image_url,
      }

      const formattedSkills = skillsList.map(skill => ({
        imageUrl: skill.image_url,
        name: skill.name,
      }))

      this.setState({
        jobDetails: formattedJobDetails,
        similarJobs: updatedSimilarJobs,
        skillsList: formattedSkills,
        lifeAtCompany: updatedLifeAtCompany,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 400) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetails = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    return (
      <div className="job-item-details-container">
        <div className="logo-title-rating-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo-img"
          />
          <div className="company-title-rating-container">
            <h1 className="job-title">{title}</h1>
            <div className="job-rating-container">
              <AiFillStar className="job-rating-star" />
              <h1 className="job-rating">{rating}</h1>
            </div>
          </div>
        </div>
        <div className="location-emp-package-container">
          <div className="location-emp-container">
            <MdLocationOn className="job-location-icon" />
            <p className="job-location">{location}</p>

            <BsFillBriefcaseFill className="job-briefcase-icon" />
            <p className="job-emp-type">{employmentType}</p>
          </div>
          <h1 className="job-package-per-annum-heading">{packagePerAnnum}</h1>
        </div>
        <div className="job-hr-container">
          <hr className="job-horizontal-line" />
        </div>
        <div className="desc-container">
          <h1 className="job-description-heading">Description</h1>
          <div className="link-container">
            <a className="description-link" href={companyWebsiteUrl}>
              Visit <HiExternalLink />
            </a>
          </div>
        </div>
        <p className="job-details-item-description">{jobDescription}</p>
      </div>
    )
  }

  renderSkillsList = () => {
    const {skillsList} = this.state
    console.log(skillsList)

    return (
      <div className="skills-container">
        <h1 className="skills-heading">Skills</h1>
        <ul className="skill-list-items">
          {skillsList.map(skill => (
            <SkillItem skillDetails={skill} key={skill.name} />
          ))}
        </ul>
      </div>
    )
  }

  renderLifeAtCompany = () => {
    const {lifeAtCompany} = this.state
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="life-at-company">
        <div className="left-life-container">
          <h1 className="life-at-company-heading">Life at Company</h1>
          <p className="life-at-company-description">{description}</p>
        </div>
        <img
          src={imageUrl}
          alt="life at company"
          className="life-at-company-img"
        />
      </div>
    )
  }

  renderSimilarJobsList = () => {
    const {similarJobs} = this.state

    return (
      <div className="similar-jobs-container">
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-job-items-container">
          {similarJobs.map(job => (
            <SimilarJobItem similarJobItemDetails={job} key={job.id} />
          ))}
        </ul>
      </div>
    )
  }

  jobDetailsRetry = () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    this.getJobItemDetails()
  }

  renderJobDetailsFailureView = () => (
    <div className="job-details-item-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="details-failure-view-img"
      />
      <h1 className="job-details-failure-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="job-details-failure-description">
        We cannot seem tp find the page you are looking for.
      </p>
      <button
        type="button"
        className="job-details-failure-retry-btn"
        onClick={this.jobDetailsRetry}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailsLoader = () => (
    <div className="job-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsItem = () => (
    <>
      <div className="job-details-container">
        {this.renderJobDetails()}
        {this.renderSkillsList()}
        {this.renderLifeAtCompany()}
      </div>
      <div className="similar-jobs-bottom-container">
        {this.renderSimilarJobsList()}
      </div>
    </>
  )

  renderJobItems = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsItem()
      case apiStatusConstants.failure:
        return this.renderJobDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderJobDetailsLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-bg-container">{this.renderJobItems()}</div>
      </>
    )
  }
}

export default JobItemDetails
