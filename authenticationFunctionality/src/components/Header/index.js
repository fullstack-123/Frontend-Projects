// Write your JS code here
import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="header-container">
    <Link to="/" className="link-item">
      <li className="list-item">Home</li>
    </Link>
    <Link to="/about" className="link-item">
      <li className="list-item">About</li>
    </Link>
  </div>
)

export default Header
