// Write your JS code here
import Header from '../Header'
import LogoutButton from '../LogoutButton'
import './index.css'

const About = () => (
  <div className="about-bg-container">
    <Header />
    <div className="about-container">
      <h1 className="about-heading">About Route</h1>
      <LogoutButton />
    </div>
  </div>
)

export default About
