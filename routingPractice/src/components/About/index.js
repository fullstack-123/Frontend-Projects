// Write your JS code here
import Header from '../Header'
import './index.css'

const About = () => (
  <>
    <Header />
    <div className="about-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/about-blog-img.png"
        className="about-img"
        alt="about"
      />
      <h1 className="about-heading">About</h1>
      <p className="about-description">
        I love to create! I am a frontend web developer
      </p>
    </div>
  </>
)

export default About
