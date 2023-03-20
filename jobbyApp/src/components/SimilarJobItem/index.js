import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobItemDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobItemDetails

  return (
    <li className="similar-job-list-item" key={id}>
      <div className="similar-job-logo-title-container">
        <img
          src={companyLogoUrl}
          alt="company logo"
          className="similar-job-company-logo"
        />
        <div className="title-rating-container">
          <h1 className="similar-job-title">{title}</h1>
          <div className="similar-job-rating-container">
            <AiFillStar className="similar-job-rating-star" />
            <h1 className="similar-job-rating">{rating}</h1>
          </div>
        </div>
      </div>
      <h1 className="similar-card-heading">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="similar-job-location-emp-container">
        <MdLocationOn className="similar-job-location-icon" />
        <p className="similar-job-location">{location}</p>

        <BsFillBriefcaseFill className="similar-job-briefcase-icon" />
        <p className="similar-job-emp-type">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobItem
