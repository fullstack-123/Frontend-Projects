import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {jobItemDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobItemDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item" key={id}>
        <div className="logo-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-rating-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="rating-icon" />
              <h1 className="rating">{rating}</h1>
            </div>
          </div>
        </div>
        <div className="location-package-container">
          <div className="location-emp-type-container">
            <MdLocationOn className="location-icon" />
            <p className="location">{location}</p>

            <BsFillBriefcaseFill className="briefcase-icon" />
            <p className="emp-type">{employmentType}</p>
          </div>
          <h1 className="package-per-annum-heading">{packagePerAnnum}</h1>
        </div>
        <div className="hr-container">
          <hr className="horizontal-line" />
        </div>
        <h1 className="description-heading">Description</h1>
        <p className="job-item-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
